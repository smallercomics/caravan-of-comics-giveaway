<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>Caravan of Comics Digital Comics Giveaway | <%= name %></title>

		<meta property="og:title" 
			  content="Caravan of Comics Digital Comics Giveaway - <%= name %>" />
		<meta property="og:url" 
			  content="http://caravanofcomics.com/giveaway/<%= slug %>.html" />
		<meta property="og:description"
			  content="The Caravan of Comics Digital Comics Giveaway</strong> features a different cartoonist / comic maker each week. Download a free comic and get to know their work a little better." />
		<meta property="og:image"
			  content="http://caravanofcomics.com/giveaway/assets/<%= slug %>/<%= slug %>.jpg"/>

		<meta name="twitter:card" content="photo" />
		<mata name="twitter:site"content = "@caravanofcomics" />
		<meta name="twitter:creator" content = "@caravanofcomics" />
		<meta name="twitter:title" content = "<%= name %>" />
		<meta name="twitter:image" content = "http://caravanofcomics.com/giveaway/assets/<%= slug %>/<%= slug %>.jpg" />

		<link rel="canonical" href="http://caravanofcomics.com/giveaway/<%= slug %>.html" />
		<link href='http://fonts.googleapis.com/css?family=Open+Sans|Roboto+Slab:700' rel='stylesheet' type='text/css'>
		
		<style type="text/css">
			@import "css/main.css";

			#banner{
				background-image:url(assets/<%= slug %>/banner.jpg);
				<% if (background){ %>
					background-size:<%= background.size || "auto"%>;
					background-repeat:<%= background.repeat || "repeat" %>;
					background-position:<%= background.position || "center top" %>;
				<% }; %>
			}
			.format{
				background-image:url(assets/<%= slug %>/chip.jpg);
			}
		</style>

	</head>
	<body>
		<div id="main-wrap">
		<header>
			<div class="wrap">
			<p>The <strong id='maintitle'>Caravan of Comics Digital Comic Giveaway</strong> features a different cartoonist / comic maker each week. <a class="to-download download" href="#download">Download a free comic</a> and get to know their work a little better.</p>
			<p><a href="#subscribe">Subscribe</a> and we'll let you know when there is a new one, or follow us on <a href="http://twitter.com/caravanofcomics">twitter</a> or <a href="https://www.facebook.com/caravanofcomics">facebook</a>.</p>
		</div>
		</header>
		<section id="banner"><div class="point"><img src='img/green-arrow.png'/></div></section>
		<section id="download">
			<div>
				<img id="cover" src="assets/<%= slug %>/cover.jpg"/>
			</div>
			<% if (download_is_available){ %>
				<p id="dl" href="#download">Download <u>Now</u></p><div class="arrow"></div>
				<div id="dlbox" class="visible">
					<div class="wrap">
						<div class="formats">
							<% _.forEach(formats, function(item){ %>
							<a data-type="<%= item.format_type %>" data-title="<%= title %>" target="_blank" class="format <%= item.format_type %>" href="/giveaway/comics/<%= slug %>/<%= item.format_link %>">
								<h3><%= item.format_type %></h3>
							</a>
							<% }); %>
						</div>
						
					</div>
					<% if (formats.length > 1){ %>
					<div class="wrap">
						<p class="note">Not sure what format you want? PDF is <em>probably</em> a safe bet. The epub files have been tested on apple/ipads, but we've only got a first-gen kindle to look on, and who knows what a cbz is even for. Please <a href="http://twitter.com/caravanofcomics">let us know</a> if anything looks weird on your thing.</p>
					</div>
					<% } %>
				</div>
			<% }else{ %>
				<p id="dl" href="#download">Download <u>expired</u></p>
				<div class="wrap">
					<p class="expired">You can't download this one anymore :( <a href="#subscribe">Subscribe</a> to find out when new ones go up</p>
				</div>
			<% } %>
		</section>
		<section class="wrap">
				<%= description %>
		</section>
		<section class="wrap" id="more">
			<h2>Links &amp; further reading...</h2>
			<%= further %>
			<% _.forEach(links, function(item){ %>
			<a class="imglink" title="<%= item.title %>" href="<%= item.link %>">
				<img src="assets/<%= slug %>/<%= item.image %>"/>
				<h4><%= item.title %></h4>
				<%= item.description %>
			</a>
			<% }); %>
							
		</section>

		<section id="next" class="wrap">
			<h2>More comics</h2>
			<p class="n">
				<% if (prev_one){ %><%= prev_one %> | <% } %><% if (next_one){ %><%= next_one %><% } %>
			</p>
			<h2 id="subscribe">Subscribe</h2>
			<p>If you want to know when we post a new one, follow us on <a href="http://twitter.com/caravanofcomics">twitter</a> or <a href="https://www.facebook.com/caravanofcomics">facebook</a>, or sign up to the mailing list:</p>

			<div id="mc_embed_signup">
            <form action="//smallercomics.us6.list-manage.com/subscribe/post?u=49bafb7944&amp;id=43d73f897c" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate="">
                <div id="mc_embed_signup_scroll">
                
                <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required="">
                <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                <div style="position: absolute; left: -5000px;"><input type="text" name="b_49bafb7944_43d73f897c" tabindex="-1" value=""></div>
                <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button">
                </div>
            </form>
            </div>

		</section>
		
			<section class="wrap" id="sponsorship">
				<h5>(This free download brought to you by)</h5>
				<% if (sponsor){ %>
					<a href="<%= sponsor.link %>" title="<% sponsor.text %>">
						<img src="<%= sponsor.image %>"/>
					</a>
				<% } %>	
			</section>
		
		<section class="wrap" id="credit">
			<p>All artwork &copy; the respective creators. Site built by <a href="http://smallercomics.com">smaller comics</a></p>
		</section>
		</div>
		<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
		<script type="text/javascript">
			var artist = "<%= name %>",
			    title = "<%= title %>";
		</script>
		<script type="text/javascript" src="js/main.min.js"></script>
	</body>
</html>