import React from 'react'

// 一个抄codepen的例子
class Index extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.drawBackground();
    }

    drawBackground() {
        window.requestAnimFrame = (function () {
            return (
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (/* function */ callback) {
                    window.setTimeout(callback, 1000 / 60);
                }
            );
        }());

        const canvas = document.getElementById('canvas');

        const context = canvas.getContext('2d');

        const W = window.innerWidth;
        const H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;

        const particleCount = 60;
        const particles = [];
        const couleurs = ['#07689f', '#a2d5f2', '#fafafa', '#ff7e67'];

        function Particle() {

            this.radius = Math.round((Math.random() * 3) + 5);
            this.x = Math.floor((Math.random() * canvas.width) + this.radius);
            this.y = Math.floor((Math.random() * canvas.height) + this.radius);
            this.color = couleurs[Math.round(Math.random() * couleurs.length)];
            this.speedx = Math.round((Math.random() * 201) + 0) / 100;
            this.speedy = Math.round((Math.random() * 201) + 0) / 100;

            switch (Math.round(Math.random() * couleurs.length)) {
                case 1:
                    this.speedx *= 1;
                    this.speedy *= 1;
                    break;
                case 2:
                    this.speedx *= -1;
                    this.speedy *= 1;
                    break;
                case 3:
                    this.speedx *= 1;
                    this.speedy *= -1;
                    break;
                case 4:
                    this.speedx *= -1;
                    this.speedy *= -1;
                    break;
                default:
                    break;
            }

            this.move = (function () {
                context.beginPath();
                context.globalCompositeOperation = 'source-over';
                context.fillStyle = this.color;
                context.globalAlpha = 1;
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                context.fill();
                context.closePath();

                this.x = this.x + this.speedx;
                this.y = this.y + this.speedy;

                if (this.x <= 0 + this.radius) {
                    this.speedx *= -1;
                }
                if (this.x >= canvas.width - this.radius) {
                    this.speedx *= -1;
                }
                if (this.y <= 0 + this.radius) {
                    this.speedy *= -1;
                }
                if (this.y >= canvas.height - this.radius) {
                    this.speedy *= -1;
                }

                for (let j = 0; j < particleCount; j++) {
                    const particleActuelle = particles[j];
                    const yd = particleActuelle.y - this.y;
                    const xd = particleActuelle.x - this.x;
                    const d = Math.sqrt(xd * xd + yd * yd);

                    if (d < 200) {
                        context.beginPath();
                        context.globalAlpha = (200 - d) / (200 - 0);
                        context.globalCompositeOperation = 'destination-over';
                        context.lineWidth = 1;
                        context.moveTo(this.x, this.y);
                        context.lineTo(particleActuelle.x, particleActuelle.y);
                        context.strokeStyle = this.color;
                        context.lineCap = 'round';
                        context.stroke();
                        context.closePath();
                    }
                }
            });
        }

        for (let i = 0; i < particleCount; i++) {
            const particle = new Particle();
            particles.push(particle);
        }


        function animate() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particleCount; i++) {
                particles[i].move();
            }
            window.requestAnimFrame(animate);
        }

        animate();
    }

    render() {
        return (
            <div>
                <canvas style={{ position: 'absolute', zIndex: '-1' }} id="canvas"></canvas>
            </div>
        );
    };
};

export default Index