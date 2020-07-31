const https = require('https')
const axios = require('axios')
const { resolve } = require('path')

const getStockDetailsWithAxios = async date => {
    try {
      const url = `https://jsonmock.hackerrank.com/api/stocks?date=${date}`
     
      const response = await axios.get(url)
      const stock = response.data 

      return stock.data.length 
        ? Promise.resolve(stock.data)
        : Promise.resolve([]) 

    } catch (e) {
      console.error(e)   
    }

}



const getStockDetailsWithHttps = async date => {
  try {
    const url = `https://jsonmock.hackerrank.com/api/stocks?date=${date}`
   
    return new Promise( (resolve, reject ) => {

      https.get(url, res => {
        res.setEncoding("utf8")
        let body = ""

        if (res.statusCode < 200 || res.statusCode >= 300) {
          resolve([])
        }

        res.on("data", data => {
          body += data;
        })

        res.on("end", () => {
          body = JSON.parse(body)
          resolve(body.data)
        })
      })
    })
      
  } catch (e) {
    console.error(e)   
  }

}




const main = async () => {
    const date = '5-January-2000'
    const date2 = '10-january-2020'
    // const test1 = await getStockDetailsWithAxios(date)
    // const test2 = await getStockDetailsWithAxios(date2)
    const test3 = await getStockDetailsWithHttps(date)
    const test4 = await getStockDetailsWithHttps(date2)
    console.log(
      // 'with axios', test1, test2,
      'with https', test3, test4
    ) 
}

main()



