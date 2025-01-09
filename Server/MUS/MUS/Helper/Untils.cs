using Microsoft.AspNetCore.Mvc.ModelBinding;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

namespace MUS.Helper
{
    public static class Untils
    {
        private static string[] _permittedExtensions = { ".txt", ".zip", ".docx", ".doc", ".mp4", ".pdf" ,"mp3" , ".wav" };

        private static long _fileSizeLimit = 2097152000;

        public static byte[] ConvertFileToByteArray(string filePath)
        {
            // Check if the file exists
            if (File.Exists(filePath))
            {
                // Read all bytes from the file
                byte[] fileBytes = File.ReadAllBytes(filePath);
                return fileBytes;
            }
            else
            {
                throw new FileNotFoundException("File not found", filePath);
            }
        }

        public static string UploadFileImage(IFormFile file)
        {
            try
            {
                string folder = $"UploadFiles/Images/{DateTime.Now.ToString("yyyyMMdd")}/";
                // full path to file in temp location
                var filePath = Path.Combine(
                    Directory.GetCurrentDirectory(), "wwwroot",
                    folder);

                bool folderExists = Directory.Exists(filePath);
                if (!folderExists)
                    Directory.CreateDirectory(filePath);

                var url = "";

                var id = Guid.NewGuid();
                var fullpath = filePath + $"{id}_{file.FileName.Replace(" ", "")}";
                using (var image = Image.Load(file.OpenReadStream()))
                {
                    int width = image.Width;
                    if (image.Width > 800)
                    {
                        width = 800;
                    }
                    image.Mutate(x => x
                         .Resize(width, 0)
                     );

                    image.Save(fullpath);
                    url = url + folder + $"{id}_{file.FileName.Replace(" ", "")}";
                }
                return url;
            }
            catch (Exception exp)
            {
                string message = $"file / upload failed! + {exp.Message}";
                return "";
            }
        }

        public static async Task<string> UploadFile(IFormFile file, ModelStateDictionary ModelState)
        {
            try
            {
                string folder = $"UploadFiles/Files/{DateTime.Now.ToString("yyyyMMdd")}/";
                // full path to file in temp location
                var path = Path.Combine(
                    Directory.GetCurrentDirectory(), "wwwroot",
                    folder);

                bool folderExists = Directory.Exists(path);
                if (!folderExists)
                    Directory.CreateDirectory(path);
                var uniqueFileName = Guid.NewGuid().ToString() + "_" + CharacterHelper.LocDau(file.FileName).Replace(" ", "");
                string filePath = Path.Combine(path, uniqueFileName);
                var url = string.Empty;
                var formFileContent =
               await FileHelpers.ProcessFormFile<IFormFile>(
                  file, ModelState!, _permittedExtensions,
                   _fileSizeLimit);

                if (file.Length > 0)
                {
                    using var fileStream = new FileStream(filePath, FileMode.Create);
                    await fileStream.WriteAsync(formFileContent);
                    url = $"{folder}/{uniqueFileName}";
                }
                return url;
            }
            catch (Exception exp)
            {
                string message = $"file / upload failed! + {exp.Message}";
                return "";
            }
        }
        public static async Task<string> UploadFileMP3(IFormFile file)
        {
            try
            {
    
                var permittedExtensions = new[] { ".mp3", ".wav" };  // Add your allowed extensions here
                var fileSizeLimit = 30 * 1024 * 1024;  // Example: 30 MB size limit

                // Validate file extension
                var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
                if (string.IsNullOrEmpty(ext) || !permittedExtensions.Contains(ext))
                {
                    throw new Exception("Invalid file type. Only MP3 and WAV files are allowed.");
                }

                // Validate file size
                if (file.Length > fileSizeLimit)
                {
                    throw new Exception($"File size exceeds the limit of {fileSizeLimit / (1024 * 1024)} MB.");
                }

                // Create folder path based on current date
                string folder = $"UploadFiles/Files/{DateTime.Now:yyyyMMdd}/";
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", folder);

                // Ensure folder exists
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                // Generate unique file name
                var uniqueFileName = Guid.NewGuid().ToString() + "_" + CharacterHelper.LocDau(file.FileName).Replace(" ", "");
                string filePath = Path.Combine(path, uniqueFileName);

                // Save file to the designated folder
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                // Return the file path or URL
                var url = $"{folder}{uniqueFileName}";
                return url;
            }
            catch (Exception ex)
            {
                // Log or handle the exception as needed
                string message = $"File upload failed: {ex.Message}";
                return message; // Return an empty string or a meaningful error message if needed
            }
        }

        public static string GetmimeType(string extension)
        {
            string mimeType = string.Empty;
            switch (extension)
            {
                case ".png":
                    mimeType = "image/png";
                    break;
                case ".jpg":
                    mimeType = "image/jpg";
                    break;
                case ".jfif":
                    mimeType = "image/jfif";
                    break;
                case ".jpeg":
                    mimeType = "image/jpeg";
                    break;
                case ".pdf":
                    mimeType = "application/pdf";
                    break;
                case ".mp3":
                    mimeType = "audio/mpeg";
                    break;
                case ".wav":
                    mimeType = "audio/wav";
                    break;
                default:
                    // no support
                    break;
            }
            return mimeType;
        }

        public static bool DeleteFile(string fileName)
        {
            try
            {
                if (!string.IsNullOrEmpty(fileName))
                {
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", fileName);

                    if (System.IO.File.Exists(filePath))
                        System.IO.File.Delete(filePath);
                    return true;
                }
                return false;
            }
            catch (Exception exp)
            {
                string message = $"file / upload failed! + {exp.Message}";
                return false;
            }

        }

    }
}
