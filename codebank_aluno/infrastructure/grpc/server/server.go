package server

import (
	"github.com/kalilmvp/codebank/infrastructure/grpc/pb"
	"github.com/kalilmvp/codebank/infrastructure/grpc/service"
	"github.com/kalilmvp/codebank/usecase"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"log"
	"net"
)

type GRPCServer struct {
	ProcessTransactionUseCase usecase.UseCaseTransaction
}

func NewGRPCServer() GRPCServer {
	return GRPCServer{}
}

func (s GRPCServer) Serve() {
	list, err := net.Listen("tcp", "0.0.0.0:50051")

	if err != nil {
		log.Fatalf("could not listen to port")
	}

	transactionService := service.NewTransactionService()
	transactionService.ProcessTransactionService = s.ProcessTransactionUseCase
	grpcServer := grpc.NewServer()

	reflection.Register(grpcServer)

	pb.RegisterPaymentServiceServer(grpcServer, transactionService)

	grpcServer.Serve(list)
}
