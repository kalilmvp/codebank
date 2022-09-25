package service

import (
	"context"
	"fmt"
	"github.com/golang/protobuf/ptypes/empty"
	"github.com/kalilmvp/codebank/dto"
	"github.com/kalilmvp/codebank/infrastructure/grpc/pb"
	"github.com/kalilmvp/codebank/usecase"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type TransactionService struct {
	ProcessTransactionService usecase.UseCaseTransaction
	pb.UnimplementedPaymentServiceServer
}

func NewTransactionService() *TransactionService {
	return &TransactionService{}
}

func (t *TransactionService) Payment(ctx context.Context, in *pb.PaymentRequest) (*empty.Empty, error) {
	fmt.Println("Chegou no payment")
	transactionDto := dto.Transaction{
		Name:            in.GetCreditCard().GetName(),
		Number:          in.GetCreditCard().GetNumber(),
		ExpirationMonth: in.GetCreditCard().GetExpirationMonth(),
		ExpirationYear:  in.GetCreditCard().GetExpirationYear(),
		CVV:             in.GetCreditCard().GetCvv(),
		Amount:          in.GetAmout(),
		Store:           in.GetStore(),
		Description:     in.GetDescription(),
	}

	transaction, err := t.ProcessTransactionService.ProcessTransaction(transactionDto)

	if err != nil {
		return &empty.Empty{}, status.Errorf(codes.FailedPrecondition, err.Error())
	}

	if transaction.Status != "approved" {
		return &empty.Empty{}, status.Errorf(codes.FailedPrecondition, "transaction rejected by the bank")
	}

	return &empty.Empty{}, nil
}
