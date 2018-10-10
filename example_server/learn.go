package main

import (
	"github.com/gin-gonic/gin"
	"math/rand"
)



func CORS () gin.HandlerFunc {
    return func(context *gin.Context) {
        context.Writer.Header().Add("Access-Control-Allow-Origin", "*")

        if context.Request.Method == "OPTIONS" {
            context.AbortWithStatus(200)
        } else {
            context.Next()
        }
    }
}

type info struct{
	Id uint32 `json:"id"`
	Name string `json:"name"`
	Image string `json:"image"`
	Cost uint32 `json:"cost"`
	Color string `json:"color"`
	Sales uint32 `json:"sales"`
	Brand string `json:"brand"`
}


func main(){
	
	router := gin.Default()
	router.Use(CORS())
	
	router.StaticFile("/list", "./index.html")
	router.Static("/img", "./img")
	router.Static("/dist", "./dist")


	Infos := []info{info{Id: 1, Name: "AirPods", Image: "http://192.168.0.101:7737/img/timg.jpg", Color:"金色", Cost: 1288, Sales: 2500, Brand: "apple"},
			info{Id: 2, Name: "Beats", Image: "http://192.168.0.101:7737/img/timg2.jpg", Color:"白色", Cost: 1188, Sales: 3700, Brand:"Bt"}}

	router.GET("getproductlist", func(c *gin.Context){
		
		c.JSON(200, gin.H{"list" : Infos})
	})
	
	router.GET("getproduct/:id", func(c *gin.Context){
		id := c.Param("id")
		if id == "1"{
			c.JSON(200, gin.H{"product" : Infos[0]})
		}else if id == "2"{
			c.JSON(200, gin.H{"product" : Infos[1]})
		}
	})
	
	
	router.GET("search/:name", func(c *gin.Context){
		name := c.Param("name")
		
		if name != ""{
			c.JSON(200, gin.H{"num" : rand.Intn(1000)})
		}else{
			c.JSON(200, gin.H{"num" : 0})
		}
		
	})
	
	
	
	router.Run(":7737")
}
