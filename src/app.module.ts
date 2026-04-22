import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { ProductsModule } from "./products/products.module";
import { AuthModule } from "./auth/auth.module";
import { LoggerMiddleware } from "./common/middlewares/logger.middleware";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CategoryModule } from "./categories/categories.module";
import { OrderModule } from "./orders/orders.module";
import typeorm from "./config/typeorm";
import { FileUploadModule } from "./file-upload/file-upload.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get("typeorm") as TypeOrmModuleOptions,
    }),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: "1d" },
      secret: process.env.JWT_SECRET,
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
    CategoryModule,
    OrderModule,
    FileUploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
