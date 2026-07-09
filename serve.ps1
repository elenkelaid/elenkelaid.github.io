param(
    [string]$Root = ".",
    [int]$Port = 8000
)

$Root = (Resolve-Path $Root).ProviderPath
$Listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$Listener.Prefixes.Add($prefix)
$Listener.Start()
Write-Host "Serving $Root at http://localhost:$Port/"
try {
    while ($Listener.IsListening) {
        $context = $Listener.GetContext()
        $req = $context.Request
        $resp = $context.Response
        $rawpath = $req.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($rawpath)) { $rawpath = "index.html" }
        $file = Join-Path $Root $rawpath
        if (Test-Path $file) {
            $ext = [IO.Path]::GetExtension($file).ToLower()
            switch ($ext) {
                ".html" { $ct = "text/html" }
                ".htm" { $ct = "text/html" }
                ".css" { $ct = "text/css" }
                ".js" { $ct = "application/javascript" }
                ".json" { $ct = "application/json" }
                ".png" { $ct = "image/png" }
                ".jpg" { $ct = "image/jpeg" }
                ".jpeg" { $ct = "image/jpeg" }
                ".gif" { $ct = "image/gif" }
                ".svg" { $ct = "image/svg+xml" }
                default { $ct = "application/octet-stream" }
            }
            $bytes = [System.IO.File]::ReadAllBytes($file)
            $resp.ContentLength64 = $bytes.Length
            $resp.ContentType = $ct
            $resp.OutputStream.Write($bytes,0,$bytes.Length)
        } else {
            $resp.StatusCode = 404
            $buffer = [System.Text.Encoding]::UTF8.GetBytes("Not Found")
            $resp.ContentLength64 = $buffer.Length
            $resp.OutputStream.Write($buffer,0,$buffer.Length)
        }
        $resp.Close()
    }
} finally {
    $Listener.Stop()
}
