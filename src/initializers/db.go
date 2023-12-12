package initializers

import (
	"fmt"
	"log"
	"time"

	"github.com/naman-paytm/golang-notes-app/src/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func ConnectDB(config *Config) {
	var err error
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", config.DBUserName, config.DBUserPassword, config.DBHost, config.DBPort, config.DBName)

	for i := 0; i < 5; i++ {
		DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
		if err == nil {
			break
		}
		log.Println("Failed to connect to the Database! Retrying in 5 seconds...")
		time.Sleep(5 * time.Second)
	}

	if err != nil {
		log.Fatal("Failed to connect to the Database! \n", err.Error())
	}

	DB.Logger = logger.Default.LogMode(logger.Info)

	log.Println("Running Migrations")
	DB.AutoMigrate(&models.Note{})

	log.Println("🚀 Connected Successfully to the Database")
}
