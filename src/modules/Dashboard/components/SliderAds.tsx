/* eslint-disable @next/next/no-img-element */
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box } from '@mui/material';
import SliderSlick from 'react-slick';

export const SliderAds = () => {
  const SliderArrowNext = props => {
    const { className, style, onClick } = props;
    return (
      <ArrowForwardIosIcon
        className={className}
        style={{ ...style, display: 'block', color: '#47487b' }}
        onClick={onClick}
      />
    );
  };

  const SliderArrowPrev = props => {
    const { className, style, onClick } = props;
    return (
      <ArrowBackIosIcon
        className={className}
        style={{ ...style, display: 'block', color: '#47487b' }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: false,
    arrow: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true,
    centerPadding: '100px',
    nextArrow: <SliderArrowNext />,
    prevArrow: <SliderArrowPrev />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          centerMode: false,
          centerPadding: '0px'
        }
      }
    ]
  };

  const dataSlider = [
    {
      urlImage: '/images/slider_1.png'
    },
    {
      urlImage: '/images/slider_5.png'
    },
    {
      urlImage: '/images/slider_7.png'
    },
    {
      urlImage: '/images/slide_2.jpeg'
    }
  ];

  return (
    <Box className="slider-ads" sx={{ mt: { xs: 0, sm: -5 } }}>
      <SliderSlick {...settings}>
        {dataSlider.map((item, index) => (
          <Box
            sx={{
              position: 'relative',
              px: { xs: 0, sm: 3 },
              borderRadius: 2,
              border: 0,
              outline: 'none'
            }}
            key={index}
          >
            <img src={item.urlImage} alt="slider" className="object-fit" />
          </Box>
        ))}
      </SliderSlick>
    </Box>
  );
};
