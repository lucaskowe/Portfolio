// Global configuration variables
const SEGMENT_LENGTH = 30; // Uniform step increment for direction changes
const MAX_TRACE_LENGTH = 800; // Maximum total length of a trace
const LINE_THICKNESS = 3; // Thickness of trace lines (dots will be twice this radius)
const DOT_SIZE = 3; // Size of black dots in center of rings
const LONG_TRACE_PROBABILITY = 0.9; // Probability (0-1) for traces to be above median length
const INITIAL_OPACITY = 1; // Starting opacity for lines and dots (0-1)
const FINAL_OPACITY = 0.2; // Final opacity when fully faded (0-1)
const GLOW_INTENSITY = 1.2; // Glow effect intensity (0 = no glow, higher = more glow)
const SHOW_GRID = false; // Whether to render the background grid (true/false)
const FADE_DURATION = 3.0; // Duration in seconds for traces to fade from initial to final opacity
const FADE_DELAY = 2.0; // Delay in seconds before fade begins after trace is complete

class PCBTraceAnimation {
    constructor() {
        this.canvas = document.getElementById('circuitCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.traces = [];
        this.maxTraces = 50;
        this.animationId = null;
        this.completedTraces = []; // Store completed traces for intersection checking
        
        // Colors for different trace types - random shades of orange
        this.colors = [
            '#ff8800',  // Bright orange
            '#ff9933',  // Light orange
            '#ff6600',  // Standard orange
            '#cc5500',  // Dark orange
            '#ff7700',  // Medium orange
            '#ff9900',  // Golden orange
            '#dd4400',  // Deep orange
            '#ff8844',  // Peach orange
            '#ee6622',  // Red-orange
            '#ffaa22'   // Yellow-orange
        ];
        
        this.init();
        this.bindEvents();
    }
    
    init() {
        this.resizeCanvas();
        this.animate();
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Pause animation when page is not visible (performance optimization)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cancelAnimationFrame(this.animationId);
            } else {
                this.animate();
            }
        });
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Adjust trace generation based on screen size
        const area = this.canvas.width * this.canvas.height;
        this.maxTraces = Math.min(100, Math.max(30, Math.floor(area / 20000)));
    }
    
    // Check if two line segments intersect
    lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
        const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (Math.abs(denom) < 1e-10) return false; // Lines are parallel
        
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;
        
        return t >= 0 && t <= 1 && u >= 0 && u <= 1;
    }
    
    // Check if a new trace would intersect with any existing traces
    wouldIntersect(newTrace) {
        const buffer = SEGMENT_LENGTH; // Minimum distance between traces (one segment length)
        
        // Check against all completed traces
        for (let existingTrace of this.completedTraces) {
            // Check each segment of the new trace against each segment of existing traces
            for (let newSegment of newTrace.segments) {
                for (let existingSegment of existingTrace.segments) {
                    // Line intersection check
                    if (this.lineIntersection(
                        newSegment.startX, newSegment.startY, newSegment.endX, newSegment.endY,
                        existingSegment.startX, existingSegment.startY, existingSegment.endX, existingSegment.endY
                    )) {
                        return true;
                    }
                    
                    // Check distance between segments
                    const dist = this.distanceLineToLine(
                        newSegment.startX, newSegment.startY, newSegment.endX, newSegment.endY,
                        existingSegment.startX, existingSegment.startY, existingSegment.endX, existingSegment.endY
                    );
                    
                    if (dist < buffer) {
                        return true;
                    }
                }
            }
            
            // Check if connection points would be too close
            for (let newPoint of newTrace.connectionPoints) {
                for (let existingPoint of existingTrace.connectionPoints) {
                    const pointDist = Math.sqrt(
                        Math.pow(newPoint.x - existingPoint.x, 2) + 
                        Math.pow(newPoint.y - existingPoint.y, 2)
                    );
                    if (pointDist < buffer) {
                        return true;
                    }
                }
            }
        }
        
        // Also check against currently drawing traces
        for (let activeTrace of this.traces) {
            for (let newSegment of newTrace.segments) {
                for (let activeSegment of activeTrace.segments) {
                    if (this.lineIntersection(
                        newSegment.startX, newSegment.startY, newSegment.endX, newSegment.endY,
                        activeSegment.startX, activeSegment.startY, activeSegment.endX, activeSegment.endY
                    )) {
                        return true;
                    }
                    
                    // Check distance between active trace segments
                    const dist = this.distanceLineToLine(
                        newSegment.startX, newSegment.startY, newSegment.endX, newSegment.endY,
                        activeSegment.startX, activeSegment.startY, activeSegment.endX, activeSegment.endY
                    );
                    
                    if (dist < buffer) {
                        return true;
                    }
                }
            }
        }
        
        return false;
    }
    
    // Calculate minimum distance between two line segments
    distanceLineToLine(x1, y1, x2, y2, x3, y3, x4, y4) {
        const distances = [
            this.distancePointToLine(x1, y1, x3, y3, x4, y4),
            this.distancePointToLine(x2, y2, x3, y3, x4, y4),
            this.distancePointToLine(x3, y3, x1, y1, x2, y2),
            this.distancePointToLine(x4, y4, x1, y1, x2, y2)
        ];
        return Math.min(...distances);
    }
    
    // Calculate distance from point to line segment
    distancePointToLine(px, py, x1, y1, x2, y2) {
        const A = px - x1;
        const B = py - y1;
        const C = x2 - x1;
        const D = y2 - y1;
        
        const dot = A * C + B * D;
        const lenSq = C * C + D * D;
        
        if (lenSq === 0) return Math.sqrt(A * A + B * B);
        
        let t = Math.max(0, Math.min(1, dot / lenSq));
        
        const projection = {
            x: x1 + t * C,
            y: y1 + t * D
        };
        
        const dx = px - projection.x;
        const dy = py - projection.y;
        
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    createTrace() {
        let attempts = 0;
        const maxAttempts = 20;
        
        while (attempts < maxAttempts) {
            const trace = {
                startX: Math.random() * this.canvas.width,
                startY: Math.random() * this.canvas.height,
                segments: [], // Array of line segments
                currentX: 0,
                currentY: 0,
                progress: 0,
                currentSegment: 0,
                segmentProgress: 0,
                speed: 0.5 + Math.random() * 2,
                opacity: INITIAL_OPACITY,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                currentDirection: Math.floor(Math.random() * 4), // Current direction
                fadeStart: false,
                connectionPoints: [],
                totalLength: 0
            };
            
            this.generateTraceSegments(trace);
            this.generateConnectionPoints(trace);
            
            // Check if this trace would intersect with existing ones
            if (!this.wouldIntersect(trace)) {
                trace.currentX = trace.startX;
                trace.currentY = trace.startY;
                return trace;
            }
            
            attempts++;
        }
        
        // If we couldn't find a non-intersecting trace after max attempts, return null
        return null;
    }
    
    generateTraceSegments(trace) {
        let currentX = trace.startX;
        let currentY = trace.startY;
        let currentDirection = trace.currentDirection;
        
        // Use probability to determine if trace should be short or long
        const medianLength = MAX_TRACE_LENGTH / 2;
        let remainingLength;
        
        if (Math.random() < LONG_TRACE_PROBABILITY) {
            // Long trace: median length to max length
            remainingLength = medianLength + Math.random() * (MAX_TRACE_LENGTH - medianLength);
        } else {
            // Short trace: 150 to median length
            remainingLength = 150 + Math.random() * (medianLength - 150);
        }
        
        const segmentLength = SEGMENT_LENGTH; // Use uniform step increment
        
        trace.segments = [];
        
        while (remainingLength >= segmentLength && this.isInBounds(currentX, currentY)) {
            let foundValidDirection = false;
            let attempts = 0;
            const maxDirectionAttempts = 12; // Increased attempts to find valid directions
            
            while (!foundValidDirection && attempts < maxDirectionAttempts) {
                // Determine next direction (75% chance to continue straight, 25% to change)
                let testDirection = currentDirection;
                if (attempts === 0 && Math.random() > 0.75) {
                    // Change direction randomly on first attempt
                    const possibleDirections = [0, 1, 2, 3]; // horizontal, vertical, diagonal1, diagonal2
                    testDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
                } else if (attempts > 0) {
                    // Try different directions if the preferred one doesn't work
                    const allDirections = [0, 1, 2, 3];
                    testDirection = allDirections[attempts % 4];
                }
                
                // Calculate next point based on test direction using exact segment length
                const nextPoint = this.getNextPoint(currentX, currentY, testDirection, segmentLength);
                
                // Keep within canvas bounds with larger margin
                nextPoint.x = Math.max(SEGMENT_LENGTH, Math.min(this.canvas.width - SEGMENT_LENGTH, nextPoint.x));
                nextPoint.y = Math.max(SEGMENT_LENGTH, Math.min(this.canvas.height - SEGMENT_LENGTH, nextPoint.y));
                
                // Create potential new segment with exact length
                const testSegment = {
                    startX: currentX,
                    startY: currentY,
                    endX: nextPoint.x,
                    endY: nextPoint.y,
                    length: segmentLength // Use exact segment length
                };
                
                // Check if this segment would intersect with any existing segments of the same trace
                if (!this.wouldSelfIntersect(trace.segments, testSegment)) {
                    // Valid segment found
                    trace.segments.push(testSegment);
                    currentDirection = testDirection;
                    currentX = nextPoint.x;
                    currentY = nextPoint.y;
                    remainingLength -= segmentLength;
                    foundValidDirection = true;
                } else {
                    attempts++;
                }
            }
            
            // If we couldn't find a valid direction, stop generating this trace
            if (!foundValidDirection) {
                break;
            }
            
            // Stop if we've moved too close to the edge (using segment length as margin)
            if (!this.isInBounds(currentX, currentY, SEGMENT_LENGTH)) {
                break;
            }
        }
        
        // Calculate total length
        trace.totalLength = trace.segments.reduce((sum, segment) => sum + segment.length, 0);
    }
    
    // Check if a new segment would intersect with existing segments of the same trace
    wouldSelfIntersect(existingSegments, newSegment) {
        const buffer = SEGMENT_LENGTH * 0.8; // Slightly reduced minimum distance for self-intersection
        
        for (let i = 0; i < existingSegments.length; i++) {
            const existingSegment = existingSegments[i];
            
            // Skip the immediately previous segment (they share an endpoint)
            if (i === existingSegments.length - 1) {
                continue;
            }
            
            // Check for line intersection
            if (this.lineIntersection(
                newSegment.startX, newSegment.startY, newSegment.endX, newSegment.endY,
                existingSegment.startX, existingSegment.startY, existingSegment.endX, existingSegment.endY
            )) {
                return true;
            }
            
            // Check for minimum distance (avoid getting too close to previous segments)
            const dist = this.distanceLineToLine(
                newSegment.startX, newSegment.startY, newSegment.endX, newSegment.endY,
                existingSegment.startX, existingSegment.startY, existingSegment.endX, existingSegment.endY
            );
            
            if (dist < buffer) {
                return true;
            }
        }
        
        return false;
    }
    
    getNextPoint(x, y, direction, length) {
        switch (direction) {
            case 0: // Horizontal
                return { x: x + (Math.random() > 0.5 ? length : -length), y: y };
            case 1: // Vertical
                return { x: x, y: y + (Math.random() > 0.5 ? length : -length) };
            case 2: // Diagonal (top-left to bottom-right)
                const dir1 = Math.random() > 0.5 ? 1 : -1;
                return { x: x + (length * 0.707 * dir1), y: y + (length * 0.707 * dir1) };
            case 3: // Diagonal (top-right to bottom-left)
                const dir2 = Math.random() > 0.5 ? 1 : -1;
                return { x: x + (length * 0.707 * dir2), y: y - (length * 0.707 * dir2) };
            default:
                return { x: x + length, y: y };
        }
    }
    
    isInBounds(x, y, margin = 0) {
        return x >= margin && x <= this.canvas.width - margin && 
               y >= margin && y <= this.canvas.height - margin;
    }
    
    calculateTraceEnd(trace) {
        // This method is no longer needed as we use segments
        // Keep it for compatibility but make it work with segments
        if (trace.segments.length > 0) {
            const lastSegment = trace.segments[trace.segments.length - 1];
            trace.endX = lastSegment.endX;
            trace.endY = lastSegment.endY;
        }
    }
    
    generateConnectionPoints(trace) {
        trace.connectionPoints = [];
        const dotRadius = LINE_THICKNESS * 2; // Dot radius is always twice the line thickness
        
        // Add connection point at the start of the trace
        trace.connectionPoints.push({
            x: trace.startX,
            y: trace.startY,
            radius: dotRadius,
            opacity: INITIAL_OPACITY
        });
        
        // Check each segment junction to see if it's a true vertex (direction change)
        for (let i = 0; i < trace.segments.length - 1; i++) {
            const currentSegment = trace.segments[i];
            const nextSegment = trace.segments[i + 1];
            
            // Calculate direction vectors
            const currentDir = this.getSegmentDirection(currentSegment);
            const nextDir = this.getSegmentDirection(nextSegment);
            
            // Only add vertex dot if direction actually changed
            if (currentDir !== nextDir) {
                trace.connectionPoints.push({
                    x: currentSegment.endX,
                    y: currentSegment.endY,
                    radius: dotRadius,
                    opacity: INITIAL_OPACITY
                });
            }
        }
        
        // Add connection point at the end of the trace
        if (trace.segments.length > 0) {
            const lastSegment = trace.segments[trace.segments.length - 1];
            trace.connectionPoints.push({
                x: lastSegment.endX,
                y: lastSegment.endY,
                radius: dotRadius,
                opacity: INITIAL_OPACITY
            });
        }
    }
    
    // Helper function to determine segment direction
    getSegmentDirection(segment) {
        const dx = segment.endX - segment.startX;
        const dy = segment.endY - segment.startY;
        
        // Use a tolerance for near-zero values
        const tolerance = 0.1;
        
        // Check if it's primarily horizontal
        if (Math.abs(dy) < tolerance) {
            return dx > 0 ? 'horizontal-right' : 'horizontal-left';
        }
        
        // Check if it's primarily vertical
        if (Math.abs(dx) < tolerance) {
            return dy > 0 ? 'vertical-down' : 'vertical-up';
        }
        
        // Check for diagonal directions
        const ratio = Math.abs(dy / dx);
        
        // If the ratio is close to 1, it's diagonal
        if (ratio > 0.7 && ratio < 1.4) {
            if (dx > 0 && dy > 0) return 'diagonal-down-right';
            if (dx > 0 && dy < 0) return 'diagonal-up-right';
            if (dx < 0 && dy > 0) return 'diagonal-down-left';
            if (dx < 0 && dy < 0) return 'diagonal-up-left';
        }
        
        // For other angles, categorize based on dominant direction
        if (Math.abs(dx) > Math.abs(dy)) {
            return dx > 0 ? 'horizontal-right' : 'horizontal-left';
        } else {
            return dy > 0 ? 'vertical-down' : 'vertical-up';
        }
    }
    
    updateTrace(trace) {
        if (trace.progress < 1) {
            // Growing phase - draw segments progressively
            trace.progress += trace.speed * 0.008;
            
            // Calculate current position along the trace
            const targetLength = trace.progress * trace.totalLength;
            let currentLength = 0;
            
            // Find which segment we're currently drawing and how far along it
            for (let i = 0; i < trace.segments.length; i++) {
                const segment = trace.segments[i];
                const segmentEnd = currentLength + segment.length;
                
                if (targetLength <= segmentEnd) {
                    // We're in this segment
                    trace.currentSegment = i;
                    trace.segmentProgress = (targetLength - currentLength) / segment.length;
                    trace.currentX = segment.startX + (segment.endX - segment.startX) * trace.segmentProgress;
                    trace.currentY = segment.startY + (segment.endY - segment.startY) * trace.segmentProgress;
                    break;
                } else if (i === trace.segments.length - 1) {
                    // We're at the end
                    trace.currentSegment = i;
                    trace.segmentProgress = 1;
                    trace.currentX = segment.endX;
                    trace.currentY = segment.endY;
                }
                
                currentLength = segmentEnd;
            }
            
            // If trace is complete, add it to completed traces for intersection checking
            if (trace.progress >= 1 && !trace.completed) {
                trace.completed = true;
                trace.fadeDelaySet = false; // Flag to ensure delay timer is only set once
                this.completedTraces.push({
                    segments: trace.segments.map(s => ({...s})), // Deep copy
                    connectionPoints: trace.connectionPoints.map(p => ({...p}))
                });
            }
        } else if (!trace.fadeStart && !trace.fadeDelaySet) {
            // Start fading after a delay (only set timer once)
            trace.fadeDelaySet = true;
            setTimeout(() => {
                trace.fadeStart = true;
            }, (FADE_DELAY * 1000) + Math.random() * 1000); // Base delay plus up to 1 second random
        } else {
            // Fading phase
            if (trace.opacity > FINAL_OPACITY) {
                // Calculate fade rate based on desired duration (assuming ~60 FPS)
                const fadeRate = (INITIAL_OPACITY - FINAL_OPACITY) / (FADE_DURATION * 60);
                
                trace.opacity = Math.max(FINAL_OPACITY, trace.opacity - fadeRate);
                trace.connectionPoints.forEach(point => {
                    point.opacity = Math.max(FINAL_OPACITY, point.opacity - fadeRate);
                });
            }
            
            // Remove from completed traces when it's nearly faded
            if (trace.opacity <= FINAL_OPACITY + 0.1) {
                this.completedTraces = this.completedTraces.filter(ct => {
                    // Check if this is the same trace by comparing first segment
                    return !(ct.segments.length > 0 && trace.segments.length > 0 &&
                            ct.segments[0].startX === trace.segments[0].startX &&
                            ct.segments[0].startY === trace.segments[0].startY);
                });
            }
        }
        
        return trace.opacity > FINAL_OPACITY;
    }
    
    drawTrace(trace) {
        this.ctx.save();
        this.ctx.globalAlpha = trace.opacity;
        
        // Draw connection points first (before the lines)
        for (let i = 0; i < trace.connectionPoints.length; i++) {
            const point = trace.connectionPoints[i];
            
            // Check if this connection point has been reached based on progress
            let shouldDraw = false;
            
            if (i === 0) {
                // First point (start) is always drawn
                shouldDraw = true;
            } else if (i === trace.connectionPoints.length - 1) {
                // Last point (end) is drawn when trace is complete
                shouldDraw = trace.progress >= 1;
            } else {
                // Vertex points are drawn when we've completed the corresponding segment
                shouldDraw = i <= trace.currentSegment;
            }
            
            if (shouldDraw) {
                this.ctx.globalAlpha = point.opacity;
                this.ctx.strokeStyle = trace.color;
                this.ctx.lineWidth = LINE_THICKNESS;
                this.ctx.lineCap = 'round';
                
                // Add glow effect to rings
                if (GLOW_INTENSITY > 0) {
                    this.ctx.shadowColor = trace.color;
                    this.ctx.shadowBlur = GLOW_INTENSITY * 1.5;
                }
                
                this.ctx.beginPath();
                this.ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
                this.ctx.stroke();
                
                // Reset shadow
                this.ctx.shadowBlur = 0;
            }
        }
        
        // Reset alpha for line drawing
        this.ctx.globalAlpha = trace.opacity;
        this.ctx.strokeStyle = trace.color;
        this.ctx.lineWidth = LINE_THICKNESS;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        // Add glow effect to lines
        if (GLOW_INTENSITY > 0) {
            this.ctx.shadowColor = trace.color;
            this.ctx.shadowBlur = GLOW_INTENSITY;
        }
        
        // Draw the segments up to current progress (after the dots)
        this.ctx.beginPath();
        
        let drawnLength = 0;
        const targetLength = trace.progress * trace.totalLength;
        
        for (let i = 0; i < trace.segments.length; i++) {
            const segment = trace.segments[i];
            const segmentStart = drawnLength;
            const segmentEnd = drawnLength + segment.length;
            
            if (i === 0) {
                this.ctx.moveTo(segment.startX, segment.startY);
            }
            
            if (targetLength >= segmentEnd) {
                // Draw complete segment
                this.ctx.lineTo(segment.endX, segment.endY);
            } else if (targetLength > segmentStart) {
                // Draw partial segment
                const segmentProgress = (targetLength - segmentStart) / segment.length;
                const partialX = segment.startX + (segment.endX - segment.startX) * segmentProgress;
                const partialY = segment.startY + (segment.endY - segment.startY) * segmentProgress;
                this.ctx.lineTo(partialX, partialY);
                break;
            } else {
                break;
            }
            
            drawnLength = segmentEnd;
        }
        
        this.ctx.stroke();
        
        // Reset shadow
        this.ctx.shadowBlur = 0;
        
        // Draw black dots in center of rings (rendered above lines)
        for (let i = 0; i < trace.connectionPoints.length; i++) {
            const point = trace.connectionPoints[i];
            
            // Check if this connection point has been reached based on progress
            let shouldDraw = false;
            
            if (i === 0) {
                // First point (start) is always drawn
                shouldDraw = true;
            } else if (i === trace.connectionPoints.length - 1) {
                // Last point (end) is drawn when trace is complete
                shouldDraw = trace.progress >= 1;
            } else {
                // Vertex points are drawn when we've completed the corresponding segment
                shouldDraw = i <= trace.currentSegment;
            }
            
            if (shouldDraw) {
                this.ctx.globalAlpha = point.opacity;
                this.ctx.fillStyle = '#000000'; // Black dot
                
                this.ctx.beginPath();
                this.ctx.arc(point.x, point.y, DOT_SIZE, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
        
        this.ctx.restore();
    }
    
    // Helper function to calculate distance of a point along the trace
    getPointDistanceAlongTrace(trace, pointX, pointY) {
        let minDistance = Infinity;
        let bestSegmentDistance = 0;
        let currentLength = 0;
        
        for (let segment of trace.segments) {
            // Find closest point on this segment
            const dist = this.distancePointToLine(pointX, pointY, 
                segment.startX, segment.startY, segment.endX, segment.endY);
            
            if (dist < minDistance) {
                minDistance = dist;
                
                // Calculate where along this segment the closest point is
                const A = pointX - segment.startX;
                const B = pointY - segment.startY;
                const C = segment.endX - segment.startX;
                const D = segment.endY - segment.startY;
                
                const dot = A * C + B * D;
                const lenSq = C * C + D * D;
                
                let t = 0;
                if (lenSq !== 0) {
                    t = Math.max(0, Math.min(1, dot / lenSq));
                }
                
                bestSegmentDistance = currentLength + t * segment.length;
            }
            
            currentLength += segment.length;
        }
        
        return bestSegmentDistance;
    }
    
    animate() {
        // Clear canvas with slight trail effect
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Add new traces randomly
        if (this.traces.length < this.maxTraces && Math.random() < 0.3) {
            const newTrace = this.createTrace();
            if (newTrace) { // Only add if we found a non-intersecting trace
                this.traces.push(newTrace);
            }
        }
        
        // Update and draw traces
        this.traces = this.traces.filter(trace => {
            const isAlive = this.updateTrace(trace);
            if (isAlive) {
                this.drawTrace(trace);
            }
            return isAlive;
        });
        
        // Add subtle grid pattern in background
        if (SHOW_GRID) {
            this.drawGrid();
        }
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    drawGrid() {
        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(0, 255, 136, 0.02)';
        this.ctx.lineWidth = 0.5;
        
        const gridSize = 50;
        
        // Vertical lines
        for (let x = 0; x < this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y < this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
        
        this.ctx.restore();
    }
}

// Prevent multiple initialization
if (!window.circuitBackgroundInitialized) {
  window.circuitBackgroundInitialized = true;

  // Initialize the animation immediately since we're loading dynamically
  // Wait a moment to ensure canvas exists
  setTimeout(() => {
    if (document.getElementById('circuitCanvas') && !window.circuitAnimation) {
      window.circuitAnimation = new PCBTraceAnimation();
    }
  }, 100);
}

