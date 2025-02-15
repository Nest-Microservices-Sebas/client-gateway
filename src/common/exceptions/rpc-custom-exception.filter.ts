import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();

        const response = ctx.getResponse();

        const rpcError = exception.getError();

        if(rpcError.toString().includes('Empty response')) {
            return response.status(500).json({
                status: 500,
                message: 'There are no suscribers listening to that message'
            }); 
        }

        if (
            typeof rpcError === 'object' &&
            'status' in rpcError &&
            'message' in rpcError
        ) {
            const status = isNaN(+rpcError.status) ? 400 : +rpcError.status;

            return response.status(status).json({
                status,
                message: rpcError.message
            });
        }

        response.status(400).json({
            status: 400,
            message: rpcError
        });
    }
}