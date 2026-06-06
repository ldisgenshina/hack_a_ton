namespace backend.Midleware.Services
{
    public class ApiException : Exception
    {
        public int StatusCode {get; private set;}
        public string Info {get; private set;} = string.Empty;

        public ApiException(int statusCode, string message)
        {
            StatusCode = statusCode;
            Info = message;
        }
    }
}