import heroImage from "../assets/hero.png";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <img src={heroImage} alt="Hero" />
    </div>
  );
};

export default Hero;