import { useState, useEffect } from "react";
import Image from "next/image";
import Frame from "../../public/images/Frame.svg";
import CurvyArrow2 from "../../public/images/CurvyArrow2.png";
import Styles from "./addSection.module.scss";
import SectionList from "../SectionList";
import { useRouter } from 'next/router';

const AddSection = () => {
    const [isFormVisible, setFormVisible] = useState(false);
    const [sections, setSections] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const router = useRouter();
    const { pathname } = router;

    useEffect(() => {
        const savedSections = JSON.parse(localStorage.getItem(pathname)) || [];
        setSections(savedSections);
    }, [pathname]);

    useEffect(() => {
        localStorage.setItem(pathname, JSON.stringify(sections));
    }, [sections, pathname]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleAddSectionClick = () => {
        setFormVisible(true);
    };

    const handleCancelClick = () => {
        setFormVisible(false);
        setInputValue("");
    };

    const handleInputChange = (e) => {
        const capitalizedInput = capitalizeFirstLetter(e.target.value);
        setInputValue(capitalizedInput);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            const newSections = [...sections, inputValue];
            setSections(newSections);
            setInputValue("");
            setFormVisible(false);
        }
    };

    return (
        <div className={Styles.section__container}>
            {/* O botão "Adicionar Seção" está sempre visível, independentemente do estado do formulário */}
            <div className={Styles.section__item} onClick={handleAddSectionClick}>
                <Image src={Frame} alt="Frame Icon" />
                <span>Adicionar seção</span>
            </div>

            {/* Exibe uma mensagem caso não haja seções */}
            {sections.length === 0 && (
                <div className={Styles.section__create}>
                    <Image src={CurvyArrow2} alt="Seta Curva" />
                    <span>Crie sua Primeira Seção aqui</span>
                </div>
            )}

            {/* Renderiza o formulário somente quando `isFormVisible` é verdadeiro */}
            {isFormVisible && (
                <form className={Styles.section__form} onSubmit={handleFormSubmit}>
                    <input 
                        type="text" 
                        placeholder="Inserir..." 
                        value={inputValue} 
                        onChange={handleInputChange} 
                    />
                    <div className={Styles.section__formbottom}>
                        <button type="submit">Adicionar</button>
                        <span onClick={handleCancelClick}>Cancelar</span>
                    </div>
                </form>
            )}

            {/* O SectionList recebe as seções e renderiza-as */}
            <SectionList sections={sections} />
        </div>
    );
};

export default AddSection;
