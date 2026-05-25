import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useLocation, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const Author = () => {
  const { authorId } = useParams();
  const location = useLocation();

  const [isFollowing, setIsFollowing] = useState(false);
  const [author, setAuthor] = useState(location.state?.seller || null);
  const [loading, setLoading] = useState(true);

  async function getAuthor() {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
      );

      setAuthor(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAuthor();
  }, [authorId]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            style={{ background: `url(${AuthorBanner}) top` }}
          ></section>

          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <div
                          className="bg-light rounded-circle"
                          style={{ width: "150px", height: "150px" }}
                        ></div>

                        <div className="profile_name">
                          <div
                            className="bg-light mb-2"
                            style={{ width: "220px", height: "30px" }}
                          ></div>
                          <div
                            className="bg-light mb-2"
                            style={{ width: "140px", height: "20px" }}
                          ></div>
                          <div
                            className="bg-light"
                            style={{ width: "280px", height: "20px" }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="profile_follow de-flex">
                      <div
                        className="bg-light"
                        style={{ width: "150px", height: "50px" }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="row">
                    {[1, 2, 3].map((item) => (
                      <div
                        className="col-lg-4 col-md-6 col-sm-6 col-xs-12"
                        key={item}
                      >
                        <div className="nft__item">
                          <div
                            className="bg-light rounded-circle mb-3"
                            style={{ width: "50px", height: "50px" }}
                          ></div>

                          <div
                            className="bg-light"
                            style={{
                              height: "260px",
                              borderRadius: "10px",
                              marginBottom: "20px",
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

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img
                        src={author?.authorImage || AuthorImage}
                        alt={author?.authorName || "Author"}
                      />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author?.authorName}{" "}
                          <span className="profile_username">
                            @{author?.tag}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {author?.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {author?.followers} followers
                      </div>
                      <button
                        className="btn-main"
                        onClick={() => setIsFollowing(!isFollowing)}
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={author?.nftCollection || []}
                    authorImage={author?.authorImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
