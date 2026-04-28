import heroImage from "../assets/hero.png";

const Hero = () => {
  return (
    <div className="w-full flex items-center bg-gray-900">
      <img src={heroImage} alt="Hero" />
    </div>
  );
};

export default Hero;