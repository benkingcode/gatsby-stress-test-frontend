import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Breadcrumb from "../components/Breadcrumb"

export const query = graphql`
  query($episodeId: ID!) {
    tenantContent {
      episode(episodeId: $episodeId) {
        id
        name
        description
        season
        episode
        duration
        releaseDate
        show {
          id
          name
        }
      }
    }
  }
`

const Episode = ({
  data: {
    tenantContent: { episode },
  },
}) => (
  <Layout>
    <Breadcrumb to={`/shows/${episode.show.id}`}>
      &larr; Back to {episode.show.name}
    </Breadcrumb>
    <h2>{episode.name}</h2>
    <ul>
      <li>Season {episode.season}</li>
      <li>Episode {episode.episode}</li>
      <li>Duration {episode.duration}</li>
      <li>Release Date {episode.releaseDate}</li>
    </ul>
    <div dangerouslySetInnerHTML={{ __html: episode.description }} />
  </Layout>
)

export default Episode
