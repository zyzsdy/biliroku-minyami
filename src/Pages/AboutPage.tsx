import React from 'react';
import packageJson from '../../package.json'

function AboutPage() {
    return (
        <div>
            <h1>About</h1>
            <h3>Biliroku Minyami {packageJson.version}</h3>
            <hr />
            <p>Biliroku Minyami 是一个基于Minyami的bilibili直播下载器。</p>
            <p>Biliroku Minyami 基于以下产品构建：</p>
            <ul>
            {
                Object.keys(packageJson.dependencies).map(l => {
                    return (
                        <li key={l}>{l}</li>
                    )
                })
            }
            </ul>
        </div>
    );
}

export default AboutPage;