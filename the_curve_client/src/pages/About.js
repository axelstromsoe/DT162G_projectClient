// ----- IMPORTS -----
import Aside from '../components/Aside';
import theCurveSketch from '../images/the_curve_sketch.png';

const About = () => {
    return (
        <div id='page-content'>
            <main>
                <h1>About</h1>
                <h2>What is the curve?</h2>
                <p>
                    The Ebbinghaus Curve, formulated by the German psychologist Hermann Ebbinghaus in the 19th century, is a groundbreaking theory that sheds light on how human memory performance changes over time. This curve forms the basis for understanding memory processes and has profound implications for education, learning, and cognitive psychology.
                </p>
                <p>
                    Hermann Ebbinghaus conducted pioneering experiments by studying how people absorb and retain information over time. He observed that the initial learning of new information is most intense, and memory retention is high. However, over time, memory performance follows a descending curve, indicating a decrease in the amount of information that can be recalled.
                </p>
                <p>
                    A central aspect of the Ebbinghaus Curve is the concept of the "spacing effect." This refers to the phenomenon where memory performance drops rapidly after learning but then stabilizes over time. This curve can be adapted to various learning situations and materials, applying to everything from memorizing words to complex subjects like mathematics and science.
                </p>
                <p>
                    For educators and teachers, understanding the Ebbinghaus Curve is crucial. It emphasizes the importance of regular repetition and practice to strengthen memory performance over time. By integrating repetition into teaching, educators can help students overcome the spacing effect and improve long-term memory.
                </p>
                <p>
                    Techniques like "spaced repetition" and "active recall" originate from the Ebbinghaus Curve. Spaced repetition involves exposing oneself to information at increasing intervals over time, countering the decline in memory performance. On the other hand, active recall means actively trying to retrieve information from memory rather than passively reviewing it, which has been shown to enhance long-term memory retention.
                </p>
                <img src={theCurveSketch} alt="" />

                <h2>How does the application work?</h2>
                <p>
                    The Curve will automatically create a study shedule for you based on speaced repetition, all you have to do is add things you learned on the page "lessons". You will therefore spend less time planing and save your energy for studying. 
                </p>
            </main>
            <Aside></Aside>
        </div>
    );
}

export default About;