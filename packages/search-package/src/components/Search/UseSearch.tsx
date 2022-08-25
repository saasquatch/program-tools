import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const GCSE_CX = "012261857935385488279:90grrsobq40";
// Prod
// const GCSE_KEY = "AIzaSyC3Lc2HenETRKNS3VIsHAMobTYhnKYG6dE";
// Local
const GCSE_KEY = "AIzaSyCrIbUMtCnszBe5kZzkbSMk5ii0PZJ5nqw";

export function getParameterByName(name: string) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(window.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export function useSearch() {
  const [response, setResponse] = useState(null);

  // Only run in the browser
  const jQuery = require("jquery");

  // var categoryFilter = "more:pagemap:metatags-type:jsReference";
  let initialIndex = 0;
  try {
    initialIndex = parseInt(getParameterByName("startIndex"));
  } catch (e) {}
  const initialState = {
    query: getParameterByName("q"),
    cat: getParameterByName("cat"),
    startIndex: initialIndex
  };
  const [{ query, cat, startIndex }, setState] = useState(initialState);
  function setQuery(newValue: string) {
    setState({
      // If you change the query, go back to page 0
      startIndex: 0,
      cat,
      query: newValue
    });
  }
  function setCat(cat: string) {
    setState({
      query,
      cat,
      // If you change the category, go back to page 0
      startIndex: 0
    });
  }
  // @ts-ignore
  function setStartIndex(startIndex) {
    setState({
      query,
      cat,
      startIndex
    });
  }
  //   jQuery(".js-search-form input[name=cat]").val([cat]);
  let privateQuery;
  if (cat && cat.length > 1) {
    // privateQuery = query + " more:pagemap:metatags-type:" + cat;
    privateQuery = query + " more:pagemap:metatags-docsCategory:" + cat;
  } else {
    privateQuery = query ? query : "hi";
  }
  let dataObj = {
    q: privateQuery,
    cx: GCSE_CX,
    key: GCSE_KEY,
    format: "json",
    start: undefined
  };
  if (startIndex) {
      // @ts-ignore
    dataObj.start = startIndex;
  }

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      jQuery.ajax({
        url: "https://www.googleapis.com/customsearch/v1",
        dataType: "jsonp",
        jsonp: "callback",
        data: value,
        // Work with the response
        success: function (response: any) {
          setResponse(response);
        }
      });
    },
    // delay in ms
    100
  );

  useEffect(() => {
    debounced(dataObj);
  }, [query, cat, startIndex]);

  return {
    response,
    query,
    setQuery,
    cat,
    setCat,
    setStartIndex
  };
}
