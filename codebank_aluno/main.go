package main

import (
	"database/sql"
	"fmt"
	"github.com/joho/godotenv"
	_ "github.com/joho/godotenv"
	"github.com/kalilmvp/codebank/infrastructure/grpc/server"
	"github.com/kalilmvp/codebank/infrastructure/kafka"
	"github.com/kalilmvp/codebank/infrastructure/repository"
	"github.com/kalilmvp/codebank/usecase"
	_ "github.com/lib/pq"
	"log"
	"os"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("error loading .env file")
	}
}

func main() {
	db := setupDb()
	defer db.Close()
	producer := setupKafkaProducer()
	processTransactionUseCase := setupTransactionUseCase(db, producer)
	serveGRPC(processTransactionUseCase)

	//fmt.Println("1")
	//
	//cc := domain.NewCreditCard()
	//cc.Number = "1234"
	//cc.Name = "Kalil"
	//cc.ExpirationYear = 2022
	//cc.ExpirationMonth = 10
	//cc.CVV = 123
	//cc.Limit = 1000
	//cc.Balance = 0
	//
	//repo := repository.NewTransactionRepositoryDb(db)
	//repo.CreateCreditCard(*cc)
	//
	//fmt.Println("2")
}

func setupTransactionUseCase(db *sql.DB, producer kafka.KafkaProducer) usecase.UseCaseTransaction {
	transactionRepository := repository.NewTransactionRepositoryDb(db)
	useCase := usecase.NewUseCaseTransaction(transactionRepository)
	useCase.KafkaProducer = producer

	return useCase
}

func setupKafkaProducer() kafka.KafkaProducer {
	producer := kafka.NewKafkaProducer()
	producer.SetupProducer(os.Getenv("KafkaBootstrapServers"))
	return producer
}

func setupDb() *sql.DB {
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		os.Getenv("host"),
		os.Getenv("port"),
		os.Getenv("user"),
		os.Getenv("password"),
		os.Getenv("dbname"),
	)

	db, err := sql.Open("postgres", psqlInfo)

	if err != nil {
		log.Fatal(err, "error connection to the database")
	}

	return db
}

func serveGRPC(processTransactionUseCase usecase.UseCaseTransaction) {
	grpcServer := server.NewGRPCServer()
	grpcServer.ProcessTransactionUseCase = processTransactionUseCase

	fmt.Println("Rodando GRPC Server")

	grpcServer.Serve()
}
