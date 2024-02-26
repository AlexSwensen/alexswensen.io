<script lang="ts">
	import { page } from '$app/stores';
	import { DarkMode, NavBrand, NavHamburger, NavLi, NavUl, Navbar } from 'flowbite-svelte';
	import NavContainer from 'flowbite-svelte/NavContainer.svelte';
	$: activeUrl = $page.url.pathname;
</script>

<Navbar>
	<NavContainer class="">
		<DarkMode btnClass="block md:hidden mr-3" />
		<NavBrand href="/" class="mr-auto md:mr-0">
			<img src="/favicon.png" class="me-3 h-6 sm:h-9" alt="Logo" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
				>alexswensen.io</span
			>
		</NavBrand>
		<NavHamburger />
		<NavUl {activeUrl} class="ml-auto">
			<NavLi href="/">Home</NavLi>
			<NavLi href="/about">About</NavLi>
			<NavLi href="/blog">Blog</NavLi>
			<!-- <NavLi href="/resume">Resume</NavLi> -->
			<!-- <NavLi href="/contact">Contact</NavLi> -->
		</NavUl>
		<DarkMode btnClass="ml-3 hidden md:block" />
	</NavContainer>
</Navbar>
<!-- <div class="navbar bg-base-200">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost no-animation">ialexswensen.io</a>
	</div>
	<div class="flex-none px-2">
		<ul class="menu menu-horizontal px-1">
			<li><a class="btn-ghost" href="/about">About</a></li>
			<li><a href="/blog">Blog</a></li>
			<li><a href="/resume">Resume</a></li>
		</ul>
	</div>
</div> -->
