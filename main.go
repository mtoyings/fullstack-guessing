package main

import (
	"fmt"
	"log"
	"math/rand"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/golang-jwt/jwt/v4"
)

type GuessUser struct {
	Email 		string 	`json: "email"`
	Guess 		int 	`json: "guess"`
	Correct 	bool 	`json: "correct"`
	Answer 		int 	`json: "answer"`


}

type LoginRequest struct {
	Role	 string
	Email    string
	Password string
}

func main(){
	fmt.Println("Hello World")

	app := fiber.New()
	guessUser := &GuessUser{}
	loginUser := &LoginRequest{}

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Get("/healthcheck", func(c *fiber.Ctx) error{
		return c.SendString("OK")

	})


	app.Post("/login", func(c *fiber.Ctx) error {
		if err := c.BodyParser(loginUser); err != nil {
			return err
		}
		
		fmt.Println(loginUser.Email)
		if loginUser.Email != "test@gmail.com" || loginUser.Password != "abc123" {
			loginUser.Role = "unauthorized"
			
		} else {
			loginUser.Role = "authorized"
		}
		
		token, exp, err := createJWTToken(*loginUser)
		if err != nil {
			return err
		}

		return c.JSON(fiber.Map{"token": token, "exp": exp, "email": loginUser.Email, "role": loginUser.Role})
	})


	app.Post("/guess", func(c *fiber.Ctx) error{

		min := 0
		max := 10

		var randNum = rand.Intn(max - min) + min
		guessUser.Answer = randNum

		if err := c.BodyParser(guessUser); err != nil {
			return err
		}

		if guessUser.Guess == randNum {
			guessUser.Correct = true
			fmt.Println("Correct Guess")
					return c.Status(201).JSON(guessUser)

			} else {
			guessUser.Correct = false
			fmt.Println("Incorrect Guess, The correct Guess is: " + strconv.Itoa(randNum))
					return c.Status(200).JSON(guessUser)

		}		

	})

	app.Get("/guess", func(c *fiber.Ctx) error{
		return c.JSON(guessUser)

	})

	log.Fatal(app.Listen(":9091"))
}

func createJWTToken(user LoginRequest) (string, int64, error) {
	exp := time.Now().Add(time.Minute * 30).Unix()
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["email"] = user.Email
	claims["exp"] = exp
	claims["role"] = user.Role
	t, err := token.SignedString([]byte("secret"))
	if err != nil {
		return "", 0, err
	}

	return t, exp, nil
}