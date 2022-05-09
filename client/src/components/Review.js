import React, {useState, useEffect} from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Disqus from "disqus-react";


export default () => {
    const {t, i18n} = useTranslation();

    const disqusShortname = "bisanalytics"
    const disqusConfig = {
        url: "",
        identifier: "review",
        title: "Reviews"
    }

    const [loaded] = useState(false)
    useEffect(() => {
        i18n.changeLanguage(localStorage.getItem('lang'));
    }, [loaded]);

    return (
        <div className="container pt-4">
            <div className="row">
                <div className="col-lg order-lg-1">
                    <div className="card mb-3">
                        <div className="card-body">
                            <h3 className="mb-4"><Trans i18nKey="reviews.title">Расскажите нам, что вы думаете. Оставьте комментарий.</Trans></h3>
                            <div className="article-container bg-secondary">
                                <Disqus.DiscussionEmbed
                                    shortname={disqusShortname}
                                    config={disqusConfig}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
