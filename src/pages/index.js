import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const gatsbyEpisodes = useStaticQuery(graphql`
    query {
      tenantContent {
        shows {
          id
          name
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <h1>TV Shows</h1>
      <ul>
        {gatsbyEpisodes.tenantContent.shows.map(show => (
          <li key={show.id}>
            <Link to={`/shows/${show.id}`}>{show.name}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default IndexPage
