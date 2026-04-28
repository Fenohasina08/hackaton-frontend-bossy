import heroImage from "../assets/hero.png";

const Hero = () => {
  return (
    <div className="w-[80vw] rounded-3xl flex h-screen bg-gray-900">
      <img src={heroImage} alt="Hero" className="w-[89vw] rounded-3xl"/>
    </div>
  );
};

export default Hero;