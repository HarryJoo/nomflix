import React from "react";
import { Link, Route, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Helmet from "react-helmet";
import Poster from "../../Components/Poster";
import Section from "../../Components/Section";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const IMDb = styled.span`
  background-color: #f5c518;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 700;
  color: black;
  padding: 5px;
`;

const IMDbLink = styled.a`
`;

const TabsHeader = styled.div`
  margin: 20px 0;
`;

const Tabs = styled.ul`
  display: flex;
  justify-content: flex-start;
`;

const Tab = styled.li`
  width: 150px;
  height: 20px;
  text-align: center;
  border-bottom: 3px solid
    ${props => (props.current ? "#3498db" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
  margin-right: 20px;
`;

const TabButton = styled.button`
  border:0 none; 
  background-color:transparent; 
  cursor:pointer;
  color: white;
`;

const TabsMain = styled.div`
`;

const TabsItem = styled.div`
  margin-bottom: 50px;
`;

const Image = styled.image`
  content: url(${props => props.bgUrl});
  display: block;
  margin-bottom: 20px;
`;

const Production = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
`;

const ProductionItem = styled.div`
  margin-bottom: 16px;
`;

const Creator = styled.span``;

const DetailPresenter = withRouter(({ location: { pathname }, match, result, loading, error, type, isMovie, handleTabs }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <>
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            {result.created_by && result.created_by.length > 0 && (
              <>
                <Divider>•</Divider>
                <Item>
                  {result.created_by.map((creator) =>
                    <Creator>{creator.name}</Creator>
                  )}
                </Item>
              </>
            )}
            {result.imdb_id && result.imdb_id.length > 0 && (
              <>
                <Divider>•</Divider>
                <IMDb>
                  <IMDbLink href={`https://www.imdb.com/title/${result.imdb_id}/`} target="_blank">IMDb</IMDbLink>
                </IMDb>
              </>
            )}
            {result.belongs_to_collection && (
              <>
                <Divider>•</Divider>
                <IMDb>
                  <Link to={`/collection/${result.belongs_to_collection.id}`}>Collection</Link>
                </IMDb>
              </>
            )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <TabsHeader>
            <Tabs>
              <Tab current={type === "youtube"}>
                <TabButton onClick={() => handleTabs("youtube")}>
                  YouTube Video
                </TabButton>
              </Tab>
              <Tab current={type === "production"}>
                <TabButton onClick={() => handleTabs("production")}>
                  Production Information
                </TabButton>
              </Tab>
              {!isMovie && (
              <Tab current={type === "seasons"}>
                <TabButton onClick={() => handleTabs("seasons")}>
                  Seasons
                </TabButton>
              </Tab>
              )}
            </Tabs>
          </TabsHeader>
          <TabsMain>
            {type && type === "youtube" && (
              result.videos.results.map(video => (
                <TabsItem>
                  <iframe src={`https://www.youtube.com/embed/${video.key}`}
                    frameborder='0'
                    allow='autoplay; encrypted-media'
                    allowfullscreen
                    title='video'
                    width='500px' 
                    height='300px'
                  />
                </TabsItem>
              ))
            )}
            {type && type === "production" && (
              <>
              <TabsItem>
                <Production>Production Company</Production>
                {result.production_companies.map(production_company => (
                  production_company.logo_path ? 
                  <Image
                    bgUrl={
                      production_company.logo_path
                        ? `https://image.tmdb.org/t/p/w300${production_company.logo_path}`
                        : require("../../assets/noPosterSmall.png")
                    }
                  />
                  : <ProductionItem>{production_company.name}</ProductionItem>
                ))}
              </TabsItem>
              </>
            )}
            {type && type === "production" && isMovie && (
              <TabsItem>
                <Production>Production Country</Production>
                {result.production_countries.map(production_country => (
                  <ProductionItem>{production_country.name}</ProductionItem>
                ))}
              </TabsItem>
            )} 
            {type && type === "production" && !isMovie && (
              <TabsItem>
                <Production>Production Country</Production>
                {result.production_companies.map(production_company => (
                  <ProductionItem>{production_company.origin_country}</ProductionItem>
                ))}
              </TabsItem>
            )}
            {type && type === "seasons" && !isMovie && (
              <TabsItem>
                <Section title="Seasons">
                  {result.seasons.map(season => (
                    <Poster
                      key={season.id}
                      id={season.id}
                      imageUrl={season.poster_path}
                      title={season.name}
                      rating={null}
                      year={season.air_date && season.air_date.substring(0, 4)}
                      isMovie={false}
                    />
                  ))}
                </Section>
              </TabsItem>
            )}
          </TabsMain>
        </Data>
      </Content>
    </Container>
    </>
  ));

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;