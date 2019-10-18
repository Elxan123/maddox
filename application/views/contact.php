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
<section style="width: 100%;
height: 100%" class="contact-map-section">
    <h2 class="hidden">Contact map</h2>
    <div class="contact-map" style="width: 100%;
height: 100%">
        <iframe style="width: 100%;
height: 100%"  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2761.3285205220877!2d6.142123415115351!3d46.20391937911663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c65290c7d7655%3A0xb75b8b943cae4cca!2sRue%20de%20la%20Conf%C3%A9d%C3%A9ration%207%2C%201204%20Gen%C3%A8ve%2C%20Switzerland!5e0!3m2!1sen!2s!4v1569152275904!5m2!1sen!2s"  allowfullscreen></iframe>

    </div>
</section>
	<!-- Call To Action Section Start -->	

	<!-- Call To Action Section Start -->


