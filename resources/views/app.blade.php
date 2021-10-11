@php
header("Cross-Origin-Embedder-Policy: require-corp"); 
header("Cross-Origin-Opener-Policy: same-origin"); 
@endphp
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>myHalalGIG</title>
        <link rel="shortcut icon" href="{{ asset('images/halal-gig-square-2.png') }}" type="image/x-icon"> 
        <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/components/icon.min.css'>
  
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    </head>
    <body class="antialiased">
        <div id="app">
        </div>
        @include('sweetalert::alert')
        <script src="{{ asset('js/app.js') }}" defer></script>
    </body>
</html>
