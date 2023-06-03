import aboutImg from '../../images/avatar.svg';
function About() {
  
  return (
    <section className="about">
      <div className="about__container">
        <img
         className="about__image"
         src={aboutImg}
         alt="Author"
         />
        <div className="about__text-container">
          <h2 className="about__title">
            About the author
          </h2>
          <p className="about__text">
            This block describes the project author. Here you should indicate your name, what you do, and which development technologies you know.
            <br/>
            <br/>
            You can also talk about your experience with Practicum, what you learned there, and how you can help potential customers.
          </p>
        </div>
      </div>
    </section>
  );
}
export default About;