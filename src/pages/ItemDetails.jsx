import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchItemDetails() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`,
      );

      setItem(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItemDetails();
    // eslint-disable-next-line
  }, [id]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div
                    className="placeholder-glow"
                    style={{
                      width: "100%",
                      height: "500px",
                      borderRadius: "12px",
                    }}
                  >
                    <span
                      className="placeholder w-100 h-100 d-block"
                      style={{ borderRadius: "12px" }}
                    ></span>
                  </div>
                </div>

                <div className="col-md-6">
                  <p className="placeholder-glow">
                    <span className="placeholder col-8 mb-3"></span>
                  </p>

                  <p className="placeholder-glow">
                    <span className="placeholder col-4 mb-4"></span>
                  </p>

                  <p className="placeholder-glow">
                    <span
                      className="placeholder col-12 mb-2"
                      style={{ height: "20px" }}
                    ></span>
                    <span
                      className="placeholder col-10 mb-2"
                      style={{ height: "20px" }}
                    ></span>
                    <span
                      className="placeholder col-7 mb-4"
                      style={{ height: "20px" }}
                    ></span>
                  </p>

                  <p className="placeholder-glow">
                    <span
                      className="placeholder col-5"
                      style={{ height: "60px" }}
                    ></span>
                  </p>

                  <p className="placeholder-glow">
                    <span
                      className="placeholder col-3"
                      style={{ height: "40px" }}
                    ></span>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {item.title} #{item.tag}
                  </h2>
                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes}
                    </div>
                  </div>
                  <p>{item.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/author">
                            <img
                              className="lazy"
                              src={item.ownerImage}
                              alt={item.ownerName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">{item.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/author">
                            <img
                              className="lazy"
                              src={item.creatorImage}
                              alt={item.creatorName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">{item.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
