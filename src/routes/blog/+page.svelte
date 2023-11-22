<h1 class="text-xl font-bold">This is a blog page... or it will be soon</h1>

<h2>another element</h2>
<script lang="ts">
    const data = import.meta.compileTime('../../lib/static-content/get-posts.ts')
    const dataJSON = JSON.stringify(data)
</script>

<div class="w-full">
<p>{dataJSON}</p>
</div>