package main

import (
	"database/sql"
	"fmt"
	"github.com/kalilmvp/codebank/domain"
	"github.com/kalilmvp/codebank/infrastructure/repository"
	"github.com/kalilmvp/codebank/usecase"
	_ "github.com/lib/pq"
	"log"
)

func main() {
	db := setupDb()
	defer db.Close()

	cc := domain.NewCreditCard()
	cc.Number = "1234"
	cc.Name = "Kalil"
	cc.ExpirationYear = 2022
	cc.ExpirationMonth = 10
	cc.CVV = 123
	cc.Limit = 1000
	cc.Balance = 0

	repo := repository.NewTransactionRepositoryDb(db)
	repo.CreateCreditCard(*cc)
}

func setupTransactionUseCase(db *sql.DB) usecase.UseCaseTransaction {
	transactionRepository := repository.NewTransactionRepositoryDb(db)
	useCase := usecase.NewUseCaseTransaction(transactionRepository)

	return useCase
}

func setupDb() *sql.DB {
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		"db",
		"5432",
		"postgres",
		"root",
		"codebank",
	)

	db, err := sql.Open("postgres", psqlInfo)

	if err != nil {
		log.Fatal(err, "error connection to the database")
	}

	return db
}
