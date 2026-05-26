import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import formatTime from "../../utils/formatTime";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "black",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        right: "-15px",
        zIndex: 10,
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "black",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        left: "-15px",
        zIndex: 10,
      }}
      onClick={onClick}
    />
  );
}

const NewItems = () => {
  const getSlidesToShow = () => {
    if (window.innerWidth < 600) return 1;
    if (window.innerWidth < 800) return 2;
    if (window.innerWidth < 1200) return 3;
    return 4;
  };

  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function getNewItems() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
      );

      setNewItems(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getNewItems();
    // eslint-disable-next-line
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-in">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            {loading ? (
              <div className="d-flex gap-4">
                {[1, 2].map((item) => (
                  <div key={item} style={{ width: "50%" }}>
                    <div className="nft__item">
                      <div
                        className="bg-light rounded-circle"
                        style={{ width: "50px", height: "50px" }}
                      ></div>

                      <div
                        className="bg-light"
                        style={{
                          width: "120px",
                          height: "35px",
                          borderRadius: "20px",
                          marginLeft: "auto",
                        }}
                      ></div>

                      <div
                        className="bg-light"
                        style={{
                          height: "260px",
                          borderRadius: "10px",
                          marginTop: "35px",
                          marginBottom: "80px",
                        }}
                      ></div>

                      <div
                        className="bg-light mb-2"
                        style={{ width: "130px", height: "20px" }}
                      ></div>

                      <div
                        className="bg-light"
                        style={{ width: "80px", height: "18px" }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Slider key={`${slidesToShow}-${newItems.length}`} {...settings}>
                {newItems.map((item) => {
                  const timeLeft = formatTime(item.expiryDate);
                  return (
                    <div key={item.id} data-aos="fade-in" className="px-2">
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId}`}
                            state={{ seller: item }}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title={`Creator: ${item.authorId}`}
                          >
                            <img
                              className="lazy"
                              src={item.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        {timeLeft && (
                          <div className="de_countdown">{timeLeft}</div>
                        )}

                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>

                              <div className="nft__item_share">
                                <h4>Share</h4>

                                <a href="#" target="_blank" rel="noreferrer">
                                  <i className="fa fa-facebook fa-lg"></i>
                                </a>

                                <a href="#" target="_blank" rel="noreferrer">
                                  <i className="fa fa-twitter fa-lg"></i>
                                </a>

                                <a href="#">
                                  <i className="fa fa-envelope fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>

                          <Link to={`/item-details/${item.nftId}`}>
                            <img
                              src={item.nftImage}
                              className="lazy nft__item_preview"
                              alt={item.title}
                            />
                          </Link>
                        </div>

                        <div className="nft__item_info">
                          <Link to={`/item-details/${item.nftId}`}>
                            <h4>{item.title}</h4>
                          </Link>

                          <div className="nft__item_price">
                            {item.price} ETH
                          </div>

                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{item.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
