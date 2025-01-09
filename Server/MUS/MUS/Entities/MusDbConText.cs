using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace MUS.Entities
{
    public class MusDbConText : DbContext
    {
        public MusDbConText()
        {
        }
        public MusDbConText(DbContextOptions<MusDbConText> options)
       : base(options)
        {
        }

        public virtual DbSet<TheLoai> TheLoais { get; set; }

        public virtual DbSet<TamTrang> TamTrangs { get; set; }

        public virtual DbSet<ChuDe> ChuDes { get; set; }
        public virtual DbSet<NhacSi> NhacSis { get; set; }
        public virtual DbSet<Album> Albums { get; set; }
        public virtual DbSet<BaiNhac> BaiNhacs { get; set; }

        public virtual DbSet<QuocGia> QuocGias { get; set; }

        public virtual DbSet<AlbumNhacSi> AlbumNhacSis { get; set; }

        public virtual DbSet<Role> Roles { get; set; }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<DanhSachPhat> DanhSachPhats { get; set; }



        public virtual DbSet<LichSuNgheNhac> LichSuNgheNhacs { get; set; }

        public virtual DbSet<DanhSachPhat_BaiNhac> DanhSachPhat_BaiNhac { get; set; }

        public virtual DbSet<ThuVien> ThuViens { get; set; }

        public virtual DbSet<ThuVienBaiNhac> ThuVienBaiNhacs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
     => optionsBuilder.UseSqlServer("Server=MSI\\SQLEXPRESS;Database=MUS;Integrated Security=True;Encrypt=True;Trusted_Connection=True;TrustServerCertificate=true;Connection Timeout=1000;");
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TamTrang>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("TamTrang");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TenTamTrang).HasMaxLength(100);
                entity.Property(e => e.Url).HasMaxLength(500);

            });
            modelBuilder.Entity<QuocGia>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("QuocGia");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.TenQuocGia).HasMaxLength(100);

            });
            modelBuilder.Entity<TheLoai>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("TheLoai");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TenTheLoai).HasMaxLength(100);
                entity.Property(e => e.Url).HasMaxLength(500);

            });
            modelBuilder.Entity<ChuDe>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("ChuDe");
                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TenChuDe).HasMaxLength(100);
                entity.Property(e => e.Url).HasMaxLength(500);
            });
            modelBuilder.Entity<NhacSi>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("NhacSi");
                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TenNhacSi).HasMaxLength(100);
                entity.Property(e => e.NickName).HasMaxLength(100);
                entity.Property(e => e.Url).HasMaxLength(100);
            });
            modelBuilder.Entity<Album>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("Album");
                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TenAlbum).HasMaxLength(100);
                entity.Property(e => e.NgayPhatHanh).HasColumnType("datetime");
                entity.Property(e => e.Url).HasMaxLength(300);
            });
            modelBuilder.Entity<BaiNhac>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("BaiNhac");
                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TenBaiNhac).HasMaxLength(100);
                entity.Property(e => e.NgayPhatHanh).HasColumnType("datetime");
                entity.Property(e => e.ThoiLuong).HasMaxLength(100);
                entity.Property(e => e.LuotNghe).HasColumnType("decimal");
                entity.Property(e => e.DuongDanHinhAnh).HasMaxLength(300);
                entity.Property(e => e.DuongDanFileAmNhac).HasMaxLength(300);
                entity.Property(e => e.LoiBaiHat).HasMaxLength(1000);
                entity.Property(e => e.KichThuoc).HasColumnType("decimal");
                entity.Property(e => e.TenFile).HasMaxLength(100);
                entity.HasOne(d => d.NhacSi).WithMany(p => p.BaiNhacs)
                   .HasForeignKey(d => d.NhacSiId)
                   .OnDelete(DeleteBehavior.ClientSetNull)
                   .HasConstraintName("FK_NhacSi_BaiNhac");
                entity.HasOne(d => d.TheLoai).WithMany(p => p.BaiNhacs)
                  .HasForeignKey(d => d.TheLoaiId)
                  .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("FK_TheLoai_BaiNhac");
                entity.HasOne(d => d.ChuDe).WithMany(p => p.BaiNhacs)
                .HasForeignKey(d => d.ChudeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChuDe_BaiNhac");
                entity.HasOne(d => d.TamTrang).WithMany(p => p.BaiNhacs)
                    .HasForeignKey(d => d.TamTrangId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                   .HasConstraintName("FK_TamTrang_BaiNhac");
                entity.HasOne(d => d.QuocGia).WithMany(p => p.BaiNhacs)
                    .HasForeignKey(d => d.QuocGiaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                   .HasConstraintName("FK_QuocGia_BaiNhac");
                entity.HasOne(d => d.Album).WithMany(p => p.BaiNhacs)
                 .HasForeignKey(d => d.AlbumId)
                 .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Album_BaiNhac");
            });

            modelBuilder.Entity<AlbumNhacSi>()
               .HasKey(aa => new { aa.NhacSiId, aa.AlBumId });

            modelBuilder.Entity<AlbumNhacSi>()
               .HasOne(aa => aa.NhacSi)
               .WithMany(a => a.AlbumNhacSis )
               .HasForeignKey(aa => aa.NhacSiId);
            modelBuilder.Entity<AlbumNhacSi>()
              .HasOne(aa => aa.Album)
              .WithMany(a => a.AlbumNhacSis)
             .HasForeignKey(aa => aa.AlBumId);

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("Role");
                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.RoleName).HasMaxLength(100);
            });


            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("User");
                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TenNguoiDung).HasMaxLength(100);
                entity.Property(e => e.SoDienThoai).HasMaxLength(11);
                entity.Property(e => e.Email).HasMaxLength(50);
                entity.Property(e => e.Password).HasMaxLength(100);
                entity.HasOne(r => r.Role).WithMany(d=> d.Users)
                      .HasForeignKey(r=> r.RoleId).OnDelete(DeleteBehavior.ClientSetNull)
                      .HasConstraintName("FK_Role_User");
                
            });


            modelBuilder.Entity<DanhSachPhat>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("DanhSachPhat");
                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TenDanhSachPhat).HasMaxLength(100);
                entity.Property(e => e.NgayPhatHanh).HasColumnType("datetime");
                entity.HasOne(r => r.User).WithMany(d => d.DanhSachPhats)
                      .HasForeignKey(r => r.UserId).OnDelete(DeleteBehavior.ClientSetNull)
                      .HasConstraintName("FK_User_DanhSachPhat");
            });

            modelBuilder.Entity<DanhSachPhat_BaiNhac>()
            .HasKey(d => new { d.DanhSachPhatId, d.BaiNhacId });

            modelBuilder.Entity<DanhSachPhat_BaiNhac>()
           .HasOne(d => d.DanhSachPhat)
           .WithMany(dd => dd.DanhSachPhat_BaiNhacs)
           .HasForeignKey(dd => dd.DanhSachPhatId);

            modelBuilder.Entity<DanhSachPhat_BaiNhac>()
            .HasOne(d => d.BaiNhac)
            .WithMany(b => b.DanhSachPhat_BaiNhacs)
            .HasForeignKey(d => d.BaiNhacId);

            modelBuilder.Entity<LichSuNgheNhac>()
             .HasOne(d => d.BaiNhac)
             .WithMany(b => b.LichSuNgheNhacs)
             .HasForeignKey(d => d.BaiNhacId);

            modelBuilder.Entity<LichSuNgheNhac>()
           .HasOne(d => d.User)
           .WithMany(b => b.LichSuNgheNhacs)
           .HasForeignKey(d => d.UserId);

            modelBuilder.Entity<ThuVien>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("ThuVien");
                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.HasOne(d => d.User).WithOne(r => r.ThuVien).HasForeignKey<ThuVien>(d => d.NguoiDungId);
            });

            modelBuilder.Entity<ThuVienBaiNhac>()
              .HasKey(sl => new { sl.ThuVienId, sl.BaiNhacId }); 

            modelBuilder.Entity<ThuVienBaiNhac>()
                .HasOne(sl => sl.ThuVien)
                .WithMany(l => l.ThuVienBaiNhacs)
                .HasForeignKey(sl => sl.ThuVienId);

            modelBuilder.Entity<ThuVienBaiNhac>()
                .HasOne(sl => sl.BaiNhac)
                .WithMany(s => s.ThuVienBaiNhacs)
                .HasForeignKey(sl => sl.BaiNhacId);
        }




    }
}
