namespace MUS.Helper
{
    public static class CharacterHelper
    {
        public static string GetNextCharacter(string currentCharacter)
        {
            var characters = new char[] { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L' , 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};

            var inputCharacters = currentCharacter.ToCharArray();

            for (int i = inputCharacters.Length - 1; i >= 0; i--)
            {
                if (inputCharacters[i] != 'Z')
                {
                    inputCharacters[i] = characters
                        [characters.ToList().IndexOf(inputCharacters[i]) + 1];
                    break;
                }
                else
                {
                    inputCharacters[i] = 'A';
                }
            }

            var result = string.Join("", inputCharacters);

            if (IsContainOnly("A", result))
            {
                result = "A" + result;
            }

            return result;
        }

        public static bool IsContainOnly(string character, string input)
        {
            var inputCharacters = input.Split();

            foreach (var inputCharacter in inputCharacters)
            {
                if (inputCharacter != character)
                {
                    return false;
                }
            }

            return true;
        }

        private static readonly string[] VietNamChar = new string[]
            {
            $"aAeEoOuUiIdDyY",
            "áàạảãâấầậẩẫăắằặẳẵ",
            "ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ",
            "éèẹẻẽêếềệểễ",
            "ÉÈẸẺẼÊẾỀỆỂỄ",
            "óòọỏõôốồộổỗơớờợởỡ",
            "ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ",
            "úùụủũưứừựửữ",
            "ÚÙỤỦŨƯỨỪỰỬỮ",
            "íìịỉĩ",
            "ÍÌỊỈĨ",
            "đ",
            "Đ",
            "ýỳỵỷỹ",
            "ÝỲỴỶỸ"
            };
        public static string LocDau(string str)
        {
            //Thay thế và lọc dấu từng char      
            for (int i = 1; i < VietNamChar.Length; i++)
            {
                for (int j = 0; j < VietNamChar[i].Length; j++)
                    str = str.Replace(VietNamChar[i][j], VietNamChar[0][i - 1]);
            }
            return str;
        }
    }
}