import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { SpecialtyService } from "../specialties/specialty.service";
import { DoctorService } from "./doctor.service";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { CreateDoctorValidatorPipe } from "./validation.pipe";

@Controller('doctors')
export class DoctorController {
  constructor(private doctorService: DoctorService, private specialtyService: SpecialtyService){}

  @Post('add')
  async insert(@Body(new CreateDoctorValidatorPipe) CreateDoctorDto: CreateDoctorDto) {
    
    const doctor = await this.doctorService.insert(CreateDoctorDto);
    
    await this.specialtyService.addDoctorToSpecialties(doctor.id, doctor.specialties);

    return "Doctor sucessfully registered!"
  }

  @Patch('update')
  update(){
    return 'update route';
  }

  @Get()
  findAllDoctors(@Query() query: {
    name:string, 
    crm:number, 
    telefoneFixo:number, 
    telefoneCelular:number,
    cep:number,
    specialties: number[]
  }){
    const service = this.specialtyService;

    if(Object.keys(query).length !== 0) {
      return this.doctorService.getDoctorByFilters(query, service);
    }

    return this.doctorService.getAllDoctors(service);
  }

  @Get('/:id')
  findDoctorById(@Param('id') id: number){
    const service = this.specialtyService;
    return this.doctorService.getDoctorById(id, service);
  }

  @Delete('remove')
  delete(){
    return 'delete route';
  }
}