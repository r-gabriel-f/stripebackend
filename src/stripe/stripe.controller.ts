import { Body, Controller, Get, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Get('products')
  async getProducts() {
    return await this.stripeService.getProducts();
  }

  @Get('customers')
  async getCustomers() {
    return await this.stripeService.getCustomers();
  }

  @Post('payment')
  async createPayment(
    @Body() body: { amount: number; currency: string; productId: string; productName: string }
  ) {
    return await this.stripeService.createPaymentIntent(
      body.amount,
      body.currency,
      body.productId,
      body.productName
    );
  }
  
}
