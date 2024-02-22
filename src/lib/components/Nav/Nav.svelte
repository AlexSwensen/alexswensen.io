<script lang="ts">
	import {page} from '$app/stores';
	import { NavBrand, NavHamburger, NavLi, NavUl, Navbar } from 'flowbite-svelte';
	$: activeUrl = $page.url.pathname;
</script>

<Navbar>
	<NavBrand href="/">
		<!-- <img src="/images/flowbite-svelte-icon-logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" /> -->
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>alexswensen.io</span
		>
	</NavBrand>
	<NavHamburger />
	<NavUl activeUrl={activeUrl}>
		<NavLi href="/">Home</NavLi>
		<NavLi href="/about">About</NavLi>
		<NavLi href="/blog">Blog</NavLi>
		<NavLi href="/resume">Resume</NavLi>
		<!-- <NavLi href="/contact">Contact</NavLi> -->
	</NavUl>
	
</Navbar>
<!-- <div class="navbar bg-base-200">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost no-animation">alexswensen.io</a>
	</div>
	<div class="flex-none px-2">
		<ul class="menu menu-horizontal px-1">
			<li><a class="btn-ghost" href="/about">About</a></li>
			<li><a href="/blog">Blog</a></li>
			<li><a href="/resume">Resume</a></li>
		</ul>
	</div>
</div> -->
