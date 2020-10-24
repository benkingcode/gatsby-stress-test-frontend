import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Breadcrumb from "../components/Breadcrumb"
import styled from "@emotion/styled"

const Swimlane = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 1em;
  row-gap: 1em;
`

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`

const EpisodeBlock = styled.div`
  display: flex;
  background-color: #222;
  color: #fff;
  padding: 1em;
  height: 200px;
  align-items: flex-end;
  text-decoration: none;
`

const EpisodeDetails = styled.div`
  opacity: 0.8;
  font-size: 14px;
  font-weight: bold;
`

const EpisodeName = styled.div`
  font-size: 16px;
  font-weight: bold;
`

export const query = graphql`
  query($showId: ID!) {
    tenantContent {
      show(showId: $showId) {
        id
        name
        description
        episodes {
          id
          season
          episode
          name
        }
      }
    }
  }
`

const Episode = ({
  data: {
    tenantContent: { show },
  },
}) => (
  <Layout>
    <Breadcrumb to="/">&larr; Back Home</Breadcrumb>
    <h2>{show.name}</h2>
    <div dangerouslySetInnerHTML={{ __html: show.description }} />
    <h3>Episodes</h3>
    <Swimlane>
      {show.episodes.map(episode => (
        <StyledLink
          key={episode.id}
          to={`/shows/${show.id}/episodes/${episode.id}`}
        >
          <EpisodeBlock>
            <div>
              <EpisodeDetails>
                S{episode.season} E{episode.episode}
              </EpisodeDetails>
              <EpisodeName>{episode.name}</EpisodeName>
            </div>
          </EpisodeBlock>
        </StyledLink>
      ))}
    </Swimlane>
  </Layout>
)

export default Episode
