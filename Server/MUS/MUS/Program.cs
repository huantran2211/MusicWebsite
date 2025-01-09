using Microsoft.EntityFrameworkCore;
using MUS.Entities;
using MUS.Repository;
using MUS.Repository.Interface;
using MUS.Services;
using MUS.Services.Interface;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



builder.Services.AddDbContext<MusDbConText>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserServices, UserServices>();

builder.Services.AddScoped<ITheLoaiRepository, TheLoaiRepository>();
builder.Services.AddScoped<ITheLoaiServices, TheLoaiServices>();

builder.Services.AddScoped<IChuDeRepository, ChuDeRepository>();
builder.Services.AddScoped<IChudeServices, ChuDeServices>();

builder.Services.AddScoped<IBaiNhacRepository, BaiNhacRepository>();
builder.Services.AddScoped<IBaiNhacServices, BaiNhacServices>();

builder.Services.AddScoped<INhacsiRepository, NhacSiRepository>();
builder.Services.AddScoped<INhacsiServices, NhacsiServices>();

builder.Services.AddScoped<ITamTrangRepository, TamTrangRepository>();
builder.Services.AddScoped<ITamTrangServices, TamTrangServices>();

builder.Services.AddScoped<IAlbumRepository, AlbumRepository>();
builder.Services.AddScoped<IAlbumServices, AlbumServices>();

builder.Services.AddScoped<IQuocGiaRepository, QuocGiaRepository>();
builder.Services.AddScoped<IQuocGiaServices, QuocGiaServices>();

builder.Services.AddScoped<IDanhSachPhatRepository, DanhSachPhatRepository>();
builder.Services.AddScoped<IDanhSachPhatServices, DanhSachPhatServices>();

builder.Services.AddScoped<ILichSuNGheNhacRepository, LichSuNgheNhacRepository>();
builder.Services.AddScoped<ILichSuNgheNhacServices, LichSuNgheNhacServices>();

builder.Services.AddScoped<IThuVienRepository, ThuVienRepository>();
builder.Services.AddScoped<IThuVienServices, ThuVienServices>();
builder.Services.AddAutoMapper(typeof(Program));

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("*"));
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
