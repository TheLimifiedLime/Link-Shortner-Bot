module.exports = {
  name: 'shorten',
  args: true,
  execute(msg, args, client) {
    const axios = require('axios');
    const strings = require('../strings.json')
    let avatar = client.user.displayAvatarURL();

        let link = encodeURIComponent(args[0], msg)

        axios.get(`https://is.gd/create.php?format=simple&url=${link}`)
        .then(function (response) {
            // handle success
            let embed =  {
              color: 0x00ff00,
              title: `Link`,
              description: `[${response.data}](${response.data})`,
              author: {
		            name: `Success`,
		            icon_url: avatar
              }
            }

            msg.channel.send({embed : embed})
        })
        .catch(function (error) {
          // handle error

          // Used to get error type and log it to the console while in development
          //console.log(error.response.data)

          if (error.response.data === strings.isgdInvalid) {
            let embed =  {
                color: 0xff0000,
                title: `Invalid URL`,
                description: `Please try again with a valid URL`,
                author: {
		              name: `Error`,
		              icon_url: avatar
                }
            }

          msg.channel.send({embed : embed})

          } else if (error.response.data === strings.isgdBlacklisted) {
            let embed =  {
              color: 0xff0000,
              title: `Blacklisted URL`,
              description: `This URL has been blacklisted. This can happen when it has been abused in the past or leads to URL shortner`,
              author: {
		            name: `Error`,
		            icon_url: avatar
              }
            }

            msg.channel.send({embed : embed})
        }
      })
    }
  }