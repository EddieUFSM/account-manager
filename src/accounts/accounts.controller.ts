import { Controller, Get, Param, Body, Post, Delete, Patch, Put, Query, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto/create-account.dto';
import { UpdateAccountDto } from './dto/create-account.dto/update-account.dto';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) {}

    @Get()
    findAll(@Query() paginationQuery){
        const { limit, offset } = paginationQuery
        return  this.accountsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        const account = this.accountsService.findOne(id)
        if(!account) throw new HttpException(`Conta #${id} não encontrada`, HttpStatus.NOT_FOUND)

        return account
    }

    @Post()
    create(@Body() createAccountDto: CreateAccountDto ){
        return this.accountsService.create(createAccountDto)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
        return this.accountsService.update(id, updateAccountDto)
    }

    @Put(':id')
    updateR(@Param('id') id: string, @Body() body) {
        return this.accountsService.update(id, body)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.accountsService.remove(id)
    }
}
