---
title: Redirecting...
permalink: /arcss/
---

<script>
  if (typeof window !== 'undefined') {
    const hash = window.location.hash; // Get the current hash (if any)
    const newUrl = '/wayfinder/' + hash; // Append the hash to the new URL
    
    // Redirect without a delay
    window.location.replace(newUrl);
  }
</script>

Redirecting to the new page...
