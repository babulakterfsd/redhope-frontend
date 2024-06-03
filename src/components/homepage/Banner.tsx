import Link from 'next/link';
import Styles from '../../styles/home.module.css';

const Banner = () => {
  return (
    <div className={`h-screen ${Styles.bannerbg}`}>
      <div className="main-container">
        <h1 className="text-red-600 text-3xl lg:text-6xl font-bold pt-20 lg:pt-40 ">
          One Drop Of Your Blood <br className="hidden lg:block" /> Can Save A
          Life
        </h1>
        <p className="text-white text-lg lg:w-7/12 mt-4">
          Blood donation is a simple way to make a big difference in someone's
          life. Your blood can save a life. By donating blood, you can help a
          variety of people in need. On the other hand, you can also help
          yourself by donating blood. Blood donation is a noble act that has a
          positive impact on the donor's health.
        </p>
        <Link href="/donors">
          <button className="mt-8 bg-red-400 rounded px-8 py-4 text-md font-semibold text-white hover:bg-red-300 transition-colors duration-300 ease-in-out">
            Search Donors
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
