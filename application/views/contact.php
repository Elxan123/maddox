<?php $this->load->view("includes/preheader") ?>
	<!-- Contact Page Section Start -->
	<div class="contact-page-sec pt-100 pb-100">
		<div class="container">
			<div class="row">				
				<div class="col-md-8">
					<div class="contact-field">

						<h2>Write Your Message</h2>
                        <form action="<?php echo base_url("message") ?>" method="post">
						<div class="col-md-6 col-sm-6 col-xs-12">
							<div class="single-input-field">
								<input placeholder="Name" type="text" name="name">
							</div>
						</div>						
						<div class="col-md-6 col-sm-6 col-xs-12">
							<div class="single-input-field">
								<input placeholder="Email" type="email" name="email">
							</div>
						</div>
						<div class="col-md-12 message-input">
							<div class="single-input-field">
								<textarea placeholder="Message" name="message"></textarea>
							</div>
						</div>																				
						<div class="single-input-fieldsbtn">
							<input value="send now " type="submit">
						</div>
                            </form>
                        <?php if($this->session->flashdata("suc")){ ?>

                            <div  class="alert-danger"><?php echo $this->session->flashdata("suc")?></div>
                        <?php } ?>

					</div>				
				</div>
				<div class="col-md-4">
					<div class="contact-info-area">
						<div class="contact-info">
							<div class="contact-info-item">
								<div class="contact-info-text">
									<h2>phone</h2>
									<span>0123456789</span> 
									<span>0987654321</span>
								</div>
							</div>						
						</div>						
						<div class="contact-info">
							<div class="contact-info-item">
								<div class="contact-info-text">
									<h2>e-mail</h2>
									<span>yourmail@gmail.com</span> 
									<span>demomail@gmail.com</span>
								</div>
							</div>						
						</div>					
						<div class="contact-info">
							<div class="contact-info-item">
								<div class="contact-info-text">
									<h2>address</h2>
									<span>united states california</span> 
									<span>united states california</span>
								</div>
							</div>						
						</div>
					</div>	
				</div>				
			</div>
		</div>
	</div>
	<!-- Contact Page Section End -->
	<div class="contact-page-map">
		<div id="map_id" class="contact-map"></div>			
	</div>		
	<!-- Call To Action Section Start -->	

	<!-- Call To Action Section Start -->


