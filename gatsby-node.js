exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      tenantContent {
        shows {
          id
          name
          description
          episodes {
            id
            name
            description
            season
            episode
            duration
            releaseDate
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic("Error loading episodes!", reporter.errors)
  }

  result.data.tenantContent.shows.forEach(show => {
    actions.createPage({
      path: `/shows/${show.id}`,
      component: require.resolve("./src/templates/show.js"),
      context: {
        showId: show.id,
      },
    })

    show.episodes.forEach(episode => {
      actions.createPage({
        path: `/shows/${show.id}/episodes/${episode.id}`,
        component: require.resolve("./src/templates/episode.js"),
        context: {
          showId: show.id,
          episodeId: episode.id,
        },
      })
    })
  })
}
