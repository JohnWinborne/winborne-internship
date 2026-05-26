import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const HotCollections = () => {
  const getSlidesToShow = () => {
    if (window.innerWidth < 600) return 1;
    if (window.innerWidth < 800) return 2;
    if (window.innerWidth < 1200) return 3;
    return 4;
  };

  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchHotCollections() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
      );

      setCollections(data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHotCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-in">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            {loading ? (
              <div className="d-flex gap-4">
                {" "}
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} style={{ width: "25%" }}>
                    {" "}
                    <div className="nft_coll">
                      {" "}
                      <div
                        className="nft_wrap bg-light"
                        style={{ height: "160px" }}
                      ></div>{" "}
                      <div className="nft_coll_pp">
                        {" "}
                        <div
                          className="bg-light rounded-circle"
                          style={{ width: "50px", height: "50px" }}
                        ></div>{" "}
                        <i className="fa fa-check"></i>{" "}
                      </div>{" "}
                      <div className="nft_coll_info">
                        {" "}
                        <div
                          className="bg-light mx-auto mb-2"
                          style={{ width: "100px", height: "15px" }}
                        ></div>{" "}
                        <div
                          className="bg-light mx-auto"
                          style={{ width: "70px", height: "15px" }}
                        ></div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>
                ))}{" "}
              </div>
            ) : (
              <Slider key={slidesToShow} {...settings}>
                {collections.map((collection, index) => (
                  <div key={index} className="px-2">
                    <div className="nft_coll" data-aos="fade-in">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${collection.nftId}`}>
                          <img
                            src={collection.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link
                          to={`/author/${collection.authorId}`}
                          state={{ seller: collection }}
                        >
                          <img
                            className="lazy pp-coll"
                            src={collection.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>ERC-{collection.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
