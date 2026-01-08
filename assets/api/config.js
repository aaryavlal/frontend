export var pythonURI;
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
      pythonURI = "http://localhost:8405";  // Same URI for localhost or 127.0.0.1
  } else {
      pythonURI = "https://hardwarehavoc.opencodingsociety.com";
  }
