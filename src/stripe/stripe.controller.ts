import { Body, Controller, Get, Post, HttpException, HttpStatus } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Get('products')
  async getProducts() {
    try {
      return await this.stripeService.getProducts();
    } catch (error) {
      throw new HttpException(
        `Error fetching products: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('customers')
  async getCustomers() {
    try {
      return await this.stripeService.getCustomers();
    } catch (error) {
      throw new HttpException(
        `Error fetching customers: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('payment')
  async createPayment(
    @Body() body: { amount: number; currency: string; productId: string; productName: string }
  ) {
    try {
      if (!body.amount || body.amount <= 0) {
        throw new HttpException(
          'Invalid amount. Amount must be greater than 0.',
          HttpStatus.BAD_REQUEST
        );
      }

      if (!body.currency) {
        throw new HttpException(
          'Currency is required.',
          HttpStatus.BAD_REQUEST
        );
      }
      return await this.stripeService.createPaymentIntent(
        body.amount,
        body.currency,
        body.productId,
        body.productName
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        `Error creating payment: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
