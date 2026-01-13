import React from 'react';
import Card from './Card';

const Reflections = () => {
  return (
    <section id="reflections" className="section reflections-section">
      <div className="container">
        <h2 className="section-title">Reflections</h2>
        <div className="reflections-cards">
          
          <div className="card reflection-card">
            <div className="card-content">
              <h3 className="card-title">Reflection: Sustainability in Electronic Systems</h3>
              <div className="card-description">
                <p><strong>i) Recount/Description of an experience -</strong><br/> During my honours thesis, I designed and constructed a LED light sculpture. The project required several hundred components of each type as repeated across the design. This led to a critical decision point concerning component sourcing. To compare options, I built a small-scale comparison model testing the tolerance stability of expensive, branded LEDs against much cheaper, lower-quality alternatives.</p>
                <p><strong>ii) React/Feelings -</strong><br/> I felt a significant degree of concern and doubt when weighing the options. The cost-saving potential of the cheaper components was huge and would have brought the project comfortably under budget. However, the model demonstrated that the cheap components exhibited potential erratic performance and high failure rates under stress. This gap created an underlying feeling of frustration. I was forced to decide between frugality and engineering integrity.</p>
                <p><strong>iii) Personal Beliefs -</strong><br/> My core belief as an engineer is that reliability is non-negotiable. While the initial cost saving seemed attractive, I believe that saving some money upfront only to create a system that fails after six months is a false economy and a form of design negligence. My initial tendency toward frugality was altered by this experience, leading me to understand that, in engineering practice, spending more on quality components is both ethically responsible and economically sound over a product's lifespan. This led me to develop a personal perspective that financial and environmental costs must be viewed across a product's entire lifecycle, not just at the point of purchase.</p>
                <p><strong>iv) Recognising Difficulties -</strong><br/> The primary difficulty I recognized was the trade-off between budgetary constraints and preventing e-waste. Sourcing unsuitable, poor-quality components risked a high rate of early component failure, which would not only create immediate e-waste but also lead to system failure and costly repairs later. The decision to spend more upfront, ensuring high reliability, was an attempt to mitigate the larger, long-term difficulty of non-viable, unsustainable design.</p>
                <p><strong>v) Perspective: Relate/research -</strong><br/> This experience relates directly to the core principles of sustainability in engineering. Specifically, it addresses the principle of 'Waste Prevention and Minimisation'. In electronics, a key sustainable practice is the inherent ability to desolder and reuse components (Circular Economy). By choosing reliable parts, I was applying this principle pre-emptively, extending the system's useful life, and minimising the creation of waste. In a similar commercial product, had I chosen the cheap parts, I would have essentially designed a product with planned obsolescence and opened up culpability for warranty issues.</p>
                <p><strong>vi) Lessons Learned and Future Intentions -</strong><br/> The lesson learned is that sustainable engineering is often more expensive initially, but it creates a viable system that is environmentally and economically sound in the long run. My future intention is to always perform a rigorous Lifecycle Assessment during the component selection phase. I will champion the view that component quality, and furthermore, system longevity, is a critical engineering specification, just as important as speed or power consumption.</p>
                </div>
            </div>
          </div>

          <div className="card reflection-card">
            <div className="card-content">
              <h3 className="card-title">Reflection: Professional Practice in an Intercultural Context</h3>
              <div className="card-description">
                <p><strong>i) Recount/Description of an experience -</strong><br/>In my role in database management at the Australian Film Television and Radio School (AFTRS), I joined a data migration project involving a software provider based in the USA. The project required numerous meetings to transition data from an old system to a new curriculum template platform. This necessitated frequent early morning video conferences due to the significant time zone differences and involved integrating customisations to meet specific Australian government data reporting requirements.</p>
                <p><strong>ii) React/Feelings -</strong><br/>I felt immediate unfair frustration due to preconceptions of Americans. Beyond the time commitment, I experienced a degree of annoyance with the provider's perceived cultural expectations. The push for zealous overtime and a seemingly rigid adherence to the existing software structure felt unreasonable in the context of typical Australian work norms. Additionally, one key contact's consistently saccharine, 'salesy' persona generated an underlying feeling of distrust among my Australian colleagues and me.</p>
                <p><strong>iii) Personal Beliefs -</strong><br/>My personal belief in professional practice assumes that technical requirements and deadlines would be the primary subjects of collaborative meetings. This experience fundamentally altered my view, revealing that professional morality, specifically the value placed on employee well-being and clear, unembellished communication varies significantly across cultures. I realised the US-based "corporate" approach, while efficient in their market, conflicted with my British-Australian influenced belief that trustworthiness is built through transparency, not performative enthusiasm.</p>
                <p><strong>iv) Recognising Difficulties -</strong><br/>The first difficulty was cultural: The provider's approach, which seemed to favour aggressive marketing and a corporate mandate over flexible, custom solutions, complicated the process. Secondly, localisation: The platform, designed for the US free-market system, lacked essential fields needed for our compliance with Australian government standards. This required significant extra effort to implement custom elements, exposing the challenge of adapting a globally-sourced solution to local regulatory requirements.</p>
                <p><strong>v) Perspective: Relate/research -</strong><br/>The US provider often used high-context language (marketing terminology, implied expectations of zeal), whereas my British-Australian experience favours a lower-context, more direct, and pragmatic approach. Furthermore, the rigidity regarding custom solutions, while challenging locally, can be seen as a necessary outcome of the US provider's drive for scalability and speed-to-market. Their strong free-market focus encourages rapid innovation and standardisation, which is economically effective on a global scale. However, this same drive conflicts with the need for localisation and the moral obligation of an engineer to ensure the software meets non-negotiable regulatory requirements of the local operating environment (Australia).</p>
                <p><strong>vi) Lessons Learned and Future Intentions -</strong><br/> Successful global projects rely less on technical skill alone and more on cultural competence and communication filtering. I now understand that professional honesty must be actively sought out in intercultural interactions. My future intention is to dedicate time at the start of any international project to explicitly discuss and document not just technical specifications, but also communication protocols and shared definitions of professional commitment and work cadence.</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Reflections;