process.on('SIGINT', function() {
  console.log('Doing some more work!')

  setTimeout(function() {
    console.log('Exiting gracefully')
    process.exit()
  }, 100)
})
